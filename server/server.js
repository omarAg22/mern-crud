//create server
const express = require('express');
const cors = require('cors');
const app = express();
const _Port = process.env.PORT;
app.use(express.json());
app.use(cors());

//connect to DB
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DB;

const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@usersmanagment.72an7h0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('database connected');
    app.listen(_Port, () => {
      console.log(`server running to port ${_Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//import User model
const UserModel = require('./models/Users');

//get request
app.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

//create user
app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});
