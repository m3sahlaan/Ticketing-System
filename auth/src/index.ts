import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error("JWT_KEY must be defined");
  // }

  try {
    await mongoose.connect(
      "mongodb+srv://ahmedanwer0094:87QZasa53hxgwmfN@cluster0.xgz2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3001, () => {
    console.log("Listening on port 3001!");
  });
};

start();
