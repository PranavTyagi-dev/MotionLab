import { fetchExercises } from "../../api/exercise.js";

let resultsEl = document.getElementById("exercise-results");
let queryEl = document.getElementById("exercise-query");
let muscleEl = document.getElementById("muscle-filter");
let equipmentEl = document.getElementById("equipment-filter");
let bodyPartEl = document.getElementById("bodypart-filter");
let emptyEl = document.getElementById("exercise-empty");
let loadingEl = document.getElementById("exercise-loading");

let selectedEl = document.getElementById("selected-exercise");
let weightEl = document.getElementById("weight-input");
let repsEl = document.getElementById("reps-input");
let distanceEl = document.getElementById("distance-input");
let calcBtn = document.getElementById("calc-btn");
let saveBtn = document.getElementById("save-workout-btn");

let forceEl = document.getElementById("force-value");
let workEl = document.getElementById("work-value");
let energyEl = document.getElementById("energy-value");
let logBodyEl = document.getElementById("workout-log-body");

let exercises = [];
let selectedExercise = null;
let latestMetrics = null;

async function getExercises() {
  let data = await fetchExercises();
  return data;
}

function matchesFilters(exercise, query) {
  if (query && !exercise.name.toLowerCase().includes(query)) {
    return false;
  }
  if (muscleEl.value !== "all" && exercise.target !== muscleEl.value) {
    return false;
  }
  if (equipmentEl.value !== "all" && exercise.equipment !== equipmentEl.value) {
    return false;
  }
  if (bodyPartEl.value !== "all" && exercise.bodyPart !== bodyPartEl.value) {
    return false;
  }
  return true;
}

function showExercises() {
  let query = queryEl.value.trim().toLowerCase();
  resultsEl.innerHTML = "";

  let filteredExercises = exercises.filter((exercise) => matchesFilters(exercise, query));

  if (filteredExercises.length === 0) {
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;

  filteredExercises.forEach((exercise) => {
    let card = document.createElement("article");
    card.className = "card exercise-card";

    let name = document.createElement("h3");
    name.innerText = exercise.name;

    let target = document.createElement("p");
    target.innerText = "Target: " + exercise.target;

    let equipment = document.createElement("p");
    equipment.innerText = "Equipment: " + exercise.equipment;

    let bodyPart = document.createElement("p");
    bodyPart.innerText = "Body Part: " + exercise.bodyPart;

    let button = document.createElement("button");
    button.className = "btn btn-secondary";
    button.innerText = "Select";

    button.addEventListener("click", () => {
      selectedExercise = exercise;
      selectedEl.value = exercise.name;
    });

    card.append(name, target, equipment, bodyPart, button);
    resultsEl.append(card);
  });
}

function calculateWorkout() {
  if (!selectedExercise) {
    alert("Select an exercise first.");
    return;
  }

  let weightKg = Number(weightEl.value);
  let reps = Number(repsEl.value);
  let distanceMeters = Number(distanceEl.value);

  if (weightKg <= 0 || reps <= 0 || distanceMeters <= 0) {
    alert("Enter valid weight, reps and distance.");
    return;
  }

  let force = weightKg * 9.8;
  let work = force * distanceMeters * reps;
  let energy = work;

  latestMetrics = { force, work, energy };

  forceEl.innerText = force.toFixed(2) + " N";
  workEl.innerText = work.toFixed(2) + " J";
  energyEl.innerText = energy.toFixed(2) + " J";
}

function saveWorkout() {
  if (!selectedExercise || !latestMetrics) {
    alert("Calculate first, then save.");
    return;
  }

  let emptyLogRow = document.getElementById("empty-log-row");
  if (emptyLogRow) {
    emptyLogRow.remove();
  }

  let row = document.createElement("tr");

  let dateTd = document.createElement("td");
  dateTd.innerText = new Date().toLocaleDateString();

  let nameTd = document.createElement("td");
  nameTd.innerText = selectedExercise.name;

  let forceTd = document.createElement("td");
  forceTd.innerText = latestMetrics.force.toFixed(2);

  let workTd = document.createElement("td");
  workTd.innerText = latestMetrics.work.toFixed(2);

  let energyTd = document.createElement("td");
  energyTd.innerText = latestMetrics.energy.toFixed(2);

  row.append(dateTd, nameTd, forceTd, workTd, energyTd);
  logBodyEl.append(row);
}

async function startApp() {
  if (!resultsEl) return;

  try {
    exercises = await getExercises();
    showExercises();
  } catch {
    if (loadingEl) {
      loadingEl.innerText = "Unable to load exercises right now.";
    }
    emptyEl.hidden = true;
  }
  queryEl.addEventListener("input", showExercises);
  muscleEl.addEventListener("change", showExercises);
  equipmentEl.addEventListener("change", showExercises);
  bodyPartEl.addEventListener("change", showExercises);
  calcBtn.addEventListener("click", calculateWorkout);
  saveBtn.addEventListener("click", saveWorkout);
}

startApp();
