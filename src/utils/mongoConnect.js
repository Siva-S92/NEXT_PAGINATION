import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("MongoDB Connected Successfully");
    }
  } catch (error) {
    console.log("MongoDB Connection Failed");
  }
};
export default connectMongoDB;