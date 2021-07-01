import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DefaultData from "./default.js";
import Routes from "./routes/route.js";

dotenv.config();
const app = express();

// database connection
import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
Connection();

app.listen(process.env.PORT, () =>
  console.log(`Server is running successfully on PORT ${process.env.PORT}`)
);
DefaultData();

app.use(express.json());

app.use(cors());
app.use("/", Routes);
