require("dotenv").config();

const mongoose = require("mongoose");

//atlas - mongodb+srv://gabru:722877hh@cluster0.uoy47wh.mongodb.net/?retryWrites=true&w=majority
//compass- mongodb://localhost:27017/traffino1

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connextion successful");
  })
  .catch((err) => {
    console.log(err.message);
  });
