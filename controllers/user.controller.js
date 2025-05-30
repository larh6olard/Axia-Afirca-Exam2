const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { email, password, ...others } = req.body;
  
  if (!email || !password) {
    return res.send("Please provide valid registration details!");
  }
  // check if user exists in the db
  const isUser = await userModel.findOne({ email: email });
  if (isUser) {
    res.send("User already exist! Please login into your account.");
  }
  // Create a hashed password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Continue with registration
  try {
    const newUser = new userModel({ 
      email, 
      password: hashedPassword, 
      ...others 
    });
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (err) {
    console.log(err.message);
    return res.send("Something went wrong!")
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // get the users login details
  const user = await userModel.findOne({ email });
  // check if email and password exists
  if (!user) {
    return res.send("This user does not exist! Please create a new account");
  }
  // check if user exists in the db
  const isUser = await userModel.findOne({ email: email });
  if (!isUser) {
    return res.send("User does not exist! Please register an account.");
  }
  // check if password is correct
  const isPasswordCorrect = bcrypt.compareSync(password, isUser.password);
  if (!isPasswordCorrect) {
    return res.send("Invalid credentials! Please try again.");
  }
  // return user details
  return res.json(isUser);
}

const getUser = async (req, res) => {
  const allUsers = await userModel.find();
  return res.json(allUsers);
};

const updateUser = async (req, res) => {
  const { id } = req.query;
  const payload = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  )
  return res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  const deleteUser = await userModel.findByIdAndDelete(id);
  return res.json(deleteUser);
};

module.exports = {
  loginUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
