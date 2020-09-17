const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router.js");
const Workout = require("./models/Workout");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(router);

app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.update({ _id : req.params.id}, { $push: { exercises: [req.body] } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});