const express = require('express');
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controler');

const route = express.Router();

route.get('/user', getUser);

route.post('/user', createUser);

route.put('/user', updateUser);

route.delete('/user', deleteUser);

module.exports = route;