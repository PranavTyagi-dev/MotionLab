# MotionLab: Physics-Based Workout and Nutrition Analyzer

## Overview

MotionLab is a web application that combines fitness, physics, and nutrition tracking into one platform.

Instead of only tracking repetitions and calories, MotionLab provides scientific insights by calculating force, work, and energy, while also tracking daily calorie and nutrient intake.

## Purpose

The purpose of this project is to:

* Apply physics concepts to workout analysis
* Provide deeper insight into physical effort
* Combine fitness tracking with nutrition monitoring

---

## Core Concept

MotionLab uses basic physics formulas:

* Force = Mass × Gravity (9.8 m/s²)
* Work = Force × Distance
* Energy ≈ Work Done

This allows users to understand workouts in scientific terms such as Newtons and Joules.

---

## APIs Used

### Exercise Data

* ExerciseDB API (via RapidAPI)
  Provides:

  * Exercise name
  * Muscle group
  * Equipment
  * Exercise animations

### Nutrition Data

* Open Food Facts API
  Provides:

  * Calories
  * Fat, sugar, protein
  * Nutritional values of food products
  * Global food database

Note: Open Food Facts is free to use and does not require an API key.

---

## Features

### Search

* Search exercises by name
* Search food items for nutrition data

### Filtering

* Filter exercises by:

  * Muscle group
  * Equipment
  * Body part

### Physics-Based Analysis

User inputs:

* Weight (kg)
* Reps
* Distance (m)

Application calculates:

* Force applied
* Work done
* Energy output

### Nutrition Tracking

* Track calorie intake
* View nutrients:
  * Protein
  * Carbohydrates
  * Fats
* Maintain a daily food log

### Data Handling 

* Sort exercises by energy output
* Sort by difficulty or muscle group
* Compare exercises

### Visualization 

* Workout performance graphs
* Calorie intake charts
* Progress tracking

## Technologies Used

* HTML
* CSS
* JavaScript
* REST APIs

## Project Structure

### 📁 Project Structure

```
motionlab/
├── pages/
│   ├── index.html
│   ├── workout.html
│   └── nutrition.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── icons/
│
├── api/
│   ├── exercise.js
│   └── nutrition.js
│
├── utils/
│   └── physics.js
│
├── components/
│   └── card.js
│
└── README.md
```

## How to Run

This is a frontend-based web project.

1. Download or clone the repository
2. Open the project folder
3. Open `index.html` in your browser

No installation is required.

## Future Improvements

* User authentication and saved data
* Advanced analytics dashboard
* Workout and calorie comparison
* Smart recommendations
* Responsive design
