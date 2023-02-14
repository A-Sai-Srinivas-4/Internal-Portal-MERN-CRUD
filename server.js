import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Welcome to our mongodb API....!");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}....!`);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected....!"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
