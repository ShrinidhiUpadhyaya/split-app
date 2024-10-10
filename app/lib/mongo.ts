import mongoose from "mongoose";
import Expense from "../models/Expense";
import Friend from "../models/Friend";
import User from "../models/User";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI, {
      dbName: process.env.NEXT_PUBLIC_DB_NAME,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});

function ensureModels() {
  User;
  Friend;
  Expense;
}

ensureModels();

export {connectToDB};
