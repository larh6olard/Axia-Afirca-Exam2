// import express from 'express';
const express = require('express');
const userRoutes = require('./routes/user.route');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();

// Create a connection to MongoDB
const uri = "mongodb://127.0.0.1:27017/user-login"
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected with Mongoose!'))
  .catch(err => console.error('Connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

// Universal Middleware
app.use(express.json());

// Users Endpoints
app.use(userRoutes);

// Listening Port to the Server
app.listen(4000, (err) => {
  if (err) throw err;
  console.log(`Server is running on port http://localhost:4000`);
});
