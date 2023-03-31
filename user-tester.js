require('dotenv').config();
const express = require('express');
const connector = require('./handlers/dataConnector.js').connect();

const UserModel = require('./models/User.js');

UserModel.findOne({ email: "zpochet2@apple.com" })
  .then((data) => {
    console.log('-- User found ---'); 
    console.log(data); 
  })
  .catch((err) => {
    console.log('user not found');
  });