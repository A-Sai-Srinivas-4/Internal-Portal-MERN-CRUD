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

// const express = require("express");
// const MongoClient = require("mongodb").MongoClient;
// const { projectSchema, employeeSchema } = require("./model");
// const cors = require("cors");
// const dotenv = require("dotenv");
// var bodyParser = require("body-parser");
// dotenv.config();
// const app = express();

// const Data = {
//   Resources: {
//     Employee_Details: [],
//     Project_Details: [],
//   },
// };

// app.use(cors({ origin: "*" }));

// app.use(express.json());
// app.use(bodyParser.json());
// var database;

// app.get("/", async (req, res) => {
//   res.send("Welcome to mongodb Api");
// });

// app.post("/api/projectdetails", (req, res) => {
//   const { ID, Name, Scrum_Master, Current_Sprint, Details } = req.body;
//   const newFormData = new projectSchema({
//     ID: ID,
//     Name: Name,
//     Scrum_Master: Scrum_Master,
//     Current_Sprint: Current_Sprint,
//     Details: Details,
//   });

//   // // save the document to the database

//   database
//     .collection("Project_Details")
//     .insertOne(newFormData, (error, result) => {
//       if (error) res.status(500).send(error);
//       res.send("new Project Added Successfully");
//     });

//   // const result = res.json(req.body)
//   // console.log(result)
// });

// app.post("/api/employeedetails", (req, res) => {
//   const { ID, Name, Image_url, Role, Team, Details } = req.body;
//   const newFormData = new employeeSchema({
//     ID: ID,
//     Name: Name,
//     Image_url: Image_url,
//     Role: Role,
//     Team: Team,
//     Details: Details,
//   });

//   // // save the document to the database

//   database
//     .collection("Employee_Details")
//     .insertOne(newFormData, (error, result) => {
//       if (error) res.status(500).send(error);
//       //res.send("new Employee Added Successfully");
//       res.send(result);
//     });

//   // const result = res.json(req.body)
//   // console.log(result)
// });

// app.get("/api/resources", async (req, res) => {
//   res.send(Data);
// });

// app.use(function(req, res, next) {
//   res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//   next();
// });

// const uri = process.env.ATLAS_URI;

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}....!`);
// });

// MongoClient.connect(
//   uri,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error, result) => {
//     if (error) throw ("MongoDB connection failed:", error.message);
//     database = result.db("Aifa_Portal_DB");

//     console.log("DB Connected Successfull");
//     database
//       .collection("Project_Details")
//       .find({})
//       .toArray((err, result) => {
//         if (err) throw err;
//         Data.Resources.Project_Details.push(...result);
//         //console.log(Resources);
//       });
//     database
//       .collection("Employee_Details")
//       .find({})
//       .toArray((err, result) => {
//         if (err) throw err;
//         Data.Resources.Employee_Details.push(...result);
//         //console.log(Data);
//       });
//   }
// );
// //client.close();
