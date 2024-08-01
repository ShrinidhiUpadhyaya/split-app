import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI, {
      dbName: process.env.NEXT_PUBLIC_DB_NAME,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

export {connectToDB};
