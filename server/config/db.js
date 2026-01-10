import mongoose from "mongoose";
import "dotenv/config";
export const connectDB = async() => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    if(response){
        console.log('Database connected successfully')
    }
  } catch (error) {
    console.log(error);
  }
};
