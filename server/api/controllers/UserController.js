const { createUser, deleteUser, getUsers, updateUser, getAuthentication } = require('../services/UserService');

/*
 * call other imported services, or same service but different functions here if you need to
*/
const addNewUser = async (req, res) => {
    const user = req.body
    try {
        let result = await createUser(user)

        res.status(result.status);
        res.json(result.message);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

//Update User
const updateExistingUser = async(req, res) => {
    const user_id = req.body._id;
    const newUserdata = req.body;
    try {
        let result = await updateUser(user_id, newUserdata);
        console.log(result.status + "==================================== Status here");
        res.status(result.status);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);

    }
}

const deleteExistingUser = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        let result = await deleteUser(email);
        console.log(result.message +" result in delete existing user in controller");
        res.status(result.status);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getAllUsers = async (req, res) => {
    try{
        let result = await getUsers();

        res.status(result.status);
        res.json(result);

    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const login = async (req, res) => {
    try{
        let result = await getAuthentication(req.body.email, req.body.password);

        res.status(result.status);
        res.json(result);

    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    addNewUser,
    deleteExistingUser,
    getAllUsers,
    updateExistingUser,
    login
}