const Users = require('../Models/users.model')

const getUsersService = async (query) => {
    const result = await Users.find(query);
    console.log(result);
    return result;
};
const postUsersService = async (data) => {
    const result = await Users.updateOne(data);
    console.log(result);
    return result;
};

const deleteUsersService = async(query) => {
    const result = await Users.deleteMany(query)
    console.log(result);
    return result;
}
const updateUsersService = async(query,data) => {
    const result = await Users.updateOne(query,data)
    console.log(result);
    return result;
}





module.exports={getUsersService, postUsersService, deleteUsersService,updateUsersService}