// Iteration #1

//create the drone schema

const { Schema, model } = require("mongoose");

const droneSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  propellers: Number,
  maxSpeed: Number,
});

//export

module.exports = model("Drone", droneSchema);
