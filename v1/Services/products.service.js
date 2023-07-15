const Products = require("../Models/products.model");


const getAllProductsService = async (filters, queries) => {
    const result = await Products.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
        ;


    const totalProducts = await Products.countDocuments(filters);
    const pageCount = Math.ceil(totalProducts / queries.limit);

    return { totalProducts, pageCount, result };
};





module.exports = { getAllProductsService }