const express = require('express');
const { loginUser, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

const route = express.Router();

route.get('/user', getUser);

route.post('/user', createUser);

route.post('/user/login', loginUser);

route.put('/user', updateUser);

route.delete('/user', deleteUser);

module.exports = route;
