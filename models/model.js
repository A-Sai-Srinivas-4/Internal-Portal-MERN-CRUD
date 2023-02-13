import mongoose from "mongoose";

const projectCollection = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Scrum_Master: {
    type: String,
    required: true,
  },
  Current_Sprint: {
    type: String,
    required: true,
  },
  Details: {
    type: Object,
    required: true,
  },
  date: { type: Date, default: new Date() },
});

const employeeCollection = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Image_url: {
    type: String,
    required: true,
  },
  Role: {
    type: Object,
    required: true,
  },
  Team: {
    type: Object,
    required: true,
  },
  Details: {
    type: Object,
    required: true,
  },
  date: { type: Date, default: new Date() },
});

export const projectSchema = mongoose.model(
  "Project_Details",
  projectCollection
);
export const employeeSchema = mongoose.model(
  "Employee_Details",
  employeeCollection
);
