const mongoose = require("mongoose");
const config = require("../config/developmentConfig")
module.exports = async () => {
  try {
    await mongoose.connect(config.DB_URL, { useNewUrlParser: true }); //This basically expect some arguments, such as the URL for database and the extra options
    console.log("Database Connected");
    
  } catch (error) {
    console.log("Database Connectivity Error", error);
    throw new Error(error);
  }
  
};
