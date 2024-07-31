const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.warn("DB error", err));
