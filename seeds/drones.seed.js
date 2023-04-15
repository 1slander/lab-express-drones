// Iteration #1

//Connect to the DB:
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";

//Call Drone model:

const DronesModel = require("../models/Drone.model");

// Data for DB:

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return DronesModel.create(drones);
  })
  .then((dronesFromDb) => {
    console.log(`Created ${dronesFromDb.length} drones`);

    //We closed connection after creating the list in DB

    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
