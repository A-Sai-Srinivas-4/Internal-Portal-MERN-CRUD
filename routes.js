import { projectSchema, employeeSchema } from "./models/model.js";
import express from "express";
import Joi from "joi";


const router = express.Router();

router.get("/resources", async (req, res) => {
  try {
    const Data = {
      Resources: {
        Employee_Details: [],
        Project_Details: [],
      },
    };
    const projectsData = await projectSchema.find().sort({ date: -1 });
    Data.Resources.Project_Details.push(...projectsData);
    const employeesData = await employeeSchema.find().sort({ date: -1 });
    Data.Resources.Employee_Details.push(...employeesData);
    //console.log(Data);
    res.send(Data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.get("/projectdetails/:id", async (req, res) => {
  try {
    
    const projectData = await projectSchema.findById(req.params.id);

    if (!projectData) return res.status(404).send("project not found...");
    res.send(projectData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.get("/employeedetails/:id", async (req, res) => {
  try {
    
    const employeeData = await employeeSchema.findById(req.params.id);

    if (!employeeData) return res.status(404).send("project not found...");
    res.send(employeeData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.post("/projectdetails", async (req, res) => {
  try {
    const schema = Joi.object({
      ID: Joi.string().required(),
      Name: Joi.string().required(),
      Scrum_Master: Joi.string().required(),
      Current_Sprint: Joi.string().required(),
      Details: Joi.object().required(),
      date: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { ID, Name, Scrum_Master, Current_Sprint, Details } = req.body;

    let newFormData = new projectSchema({
      ID,
      Name,
      Scrum_Master,
      Current_Sprint,
      Details,
    });

    newFormData = await newFormData.save();
    res.send(newFormData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.post("/employeedetails", async (req, res) => {
  try {
    const schema = Joi.object({
      ID: Joi.string().required(),
      Name: Joi.string(),
      Image_url: Joi.string(),
      Role: Joi.object(),
      Team: Joi.object(),
      Details: Joi.object(),
      date: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { ID, Name, Image_url, Role, Team, Details } = req.body;

    let newFormData = new employeeSchema({
      ID,
      Name,
      Image_url,
      Role,
      Team,
      Details,
    });

    newFormData = await newFormData.save();
    res.send(newFormData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/projectdetails/:id", async (req, res) => {
  const projectItem = await projectSchema.findById(req.params.id);

  if (!projectItem) return res.status(404).send("project is not found...");

  const deletedProject = await projectSchema.findByIdAndDelete(req.params.id);

  res.send(deletedProject);
});

router.delete("/employeedetails/:id", async (req, res) => {
  const employeeItem = await employeeSchema.findById(req.params.id);

  if (!employeeItem) return res.status(404).send("employee is not found...");

  const deletedEmployee = await employeeSchema.findByIdAndDelete(req.params.id);

  res.send(deletedEmployee);
});

router.put("/projectdetails/:id", async (req, res) => {
  const schema = Joi.object({
    ID: Joi.string().required(),
    Name: Joi.string().required(),
    Scrum_Master: Joi.string().required(),
    Current_Sprint: Joi.string().required(),
    Details: Joi.object().required(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newFormData = await projectSchema.findById(req.params.id);

    if (!newFormData) return res.status(404).send("project not found...");

    const { ID, Name, Scrum_Master, Current_Sprint, Details } = req.body;

    const updatedProject = await projectSchema.findByIdAndUpdate(
      req.params.id,
      { ID, Name, Scrum_Master, Current_Sprint, Details },
      { new: true }
    );

    res.send(updatedProject);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/employeedetails/:id", async (req, res) => {
  const schema = Joi.object({
    ID: Joi.string().required(),
    Name: Joi.string().required(),
    Image_url: Joi.string().required(),
    Role: Joi.object().required(),
    Team: Joi.object().required(),
    Details: Joi.object().required(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  try {
    const newFormData = await employeeSchema.findById(req.params.id);

    if (!newFormData) return res.status(404).send("employee not found...");

    const { ID, Name, Image_url, Role, Team, Details } = req.body;

    const updatedEmployee = await employeeSchema.findByIdAndUpdate(
      req.params.id,
      { ID, Name, Image_url, Role, Team, Details },
      { new: true }
    );

    res.send(updatedEmployee);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

export default router;
