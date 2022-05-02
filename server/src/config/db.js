const mongoose = require("mongoose")
const MONGO_URI = 'mongodb://localhost:27017/userDB'
// const MONGO_URI = `mongodb+srv://admin:12345@cluster0.q3eqt.mongodb.net/socialNetwork?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.log(error)
    console.log("MongoDB Connection Failed.");
    process.exit(1);
  }
};

module.exports = connectDB;