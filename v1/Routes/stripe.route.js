const express = require('express');
const verifyToken = require("../Middlewares/verifyToken");
const Orders = require('../Models/orders.model');
const router = express.Router();
require('dotenv').config();
// This is your secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY);


// post an user
router.post('/create-checkout-session', async (req, res) => {
  // console.log("checkbody", req.body);

  const customer = await stripe.customers.create({
    metadata: {
      cart: JSON.stringify(req.body.checkoutItems)
    }
  })

  const line_items = req.body.checkoutItems.map(item => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'KN'],
    },
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 3000,
            currency: 'eur',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items,
    phone_number_collection: {
      enabled: true
    },
    customer: customer.id,
    // automatic_tax: {
    //   enabled: true,
    // },
    // tax_id_collection: {
    //   enabled: true,
    // },
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

// Create Order

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = new Orders({
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();

    console.log("Processed Order:", savedOrder);
  } catch (error) {
    console.log(error);
  }
}

// Stripe WebHook
let endpointSecret;

// endpointSecret = 'whsec_02eb01a6f9e2df21360b8c554cce8539441bee965a6f406172e18a641cd5735a';

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  let data;
  let eventType;

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
      console.log(`WebHook Verified !`);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    data = event.data.object;
    eventType = event.type;

  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntent = event.data.object;
  //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  //     // Then define and call a method to handle the successful payment intent.
  //     // handlePaymentIntentSucceeded(paymentIntent);
  //     break;
  //   case 'payment_method.attached':
  //     const paymentMethod = event.data.object;
  //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //     // handlePaymentMethodAttached(paymentMethod);
  //     break;
  //   default:
  //     // Unexpected event type
  //     console.log(`Unhandled event type ${event.type}.`);
  // }

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer)
      .then((customer) => {
        // console.log(customer);
        // console.log("data", data);
        createOrder(customer, data)
      }).catch((err) => console.log(err.message))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send();
});


module.exports = router;