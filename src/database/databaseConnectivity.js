const mongoose = require("mongoose");
const { MONGO_URL } = require("../config/serverConfig");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URL, {
      dbName: "twitter",
    });
    console.log(
      `MONGODB CONNECTED ON HOST ${connectionInstance.connection.host} : ${connectionInstance.connection.port}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR ", error);
    process.exit(1);
  }
  return false; // Return false if the connection fails
};

module.exports = {
  connectDB,
};
