const express = require("express");
const router = express.Router();

//We need to import the model
// require the Drone model here

const DroneModel = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const droneList = await DroneModel.find();
    res.render("drones/list.hbs", { droneList });
  } catch (err) {
    console.log(`Couldn't find list: `, err);
  }
});

router.get("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const getDroneInfo = req.body;
    const newDrone = await DroneModel.create(getDroneInfo);
    console.log("New drone created: ", newDrone);
    res.redirect("/drones");
  } catch (err) {
    console.log(`Couldn't create drone: `, err);
    res.redirect("drones/create-form.hbs");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneId = req.params.id;
    console.log(droneId);
    const editDrone = await DroneModel.findById(droneId);
    console.log(editDrone);
    res.render("drones/update-form.hbs", { editDrone });
  } catch (err) {
    console.log(`Couldn't create drone: `, err);
    res.redirect("error.hbs");
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneId = req.params.id;
    const droneInfo = req.body;
    const updateDrone = await DroneModel.findByIdAndUpdate(droneId, droneInfo);
    res.redirect("/drones");
  } catch (err) {
    console.log(`Couldn't update drone: `, err);
    res.render("drones/update-form.hbs", { updateDrone });
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const droneId = req.params.id;
    const deleteDrone = await DroneModel.findByIdAndDelete(droneId);
    res.redirect("/drones");
  } catch (err) {
    console.log(`Couldn't delete drone: `, err);
    res.redirect("/error.hbs");
  }
});

module.exports = router;
