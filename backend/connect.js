const mongoose = require('mongoose');
require('dotenv').config({path:"../.env"});
console.log(process.env.LINK,"yujthgf")
async function connect() {
  try {
    await mongoose.connect(process.env.LINK);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

module.exports = { connect };
