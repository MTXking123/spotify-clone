require('dotenv').config();
const { connect } = require('mongoose');
const app = require("./src/app");
const connectDB = require('./src/db/db');
const cors = require("cors");

connectDB();

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})