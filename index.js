// import express from 'express';
const express = require('express');
const studentRoutes = require("./routes/student.route");
const courseRoutes = require('./routes/course.route');
const userRoutes = require('./routes/user.route');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();

// Create a connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
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

// Student Endpoints
app.use(studentRoutes);

// Courses Endpoints
app.use(courseRoutes);

// Users Endpoints
app.use(userRoutes);

// Listening Port to the Server
app.listen(4000, (err) => {
  if (err) throw err;
  console.log(`Server is running on port http://localhost:4000`);
});