
let foods = [];

function loadFoods() {
  const savedFoods = localStorage.getItem("foods");
  return savedFoods ? JSON.parse(savedFoods) : [];
}


//  SAVE DATA 
function saveFoods() {
  localStorage.setItem("foods", JSON.stringify(foods));
}


//  DOM ELEMENTS 
const form = document.getElementById("foodForm");
const foodNameInput = document.getElementById("foodName");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");


//  FETCH CALORIES 
async function fetchCalories(foodName) {
  try {
    // Simulated API call
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    await response.json();

    
    const calorieData = {
      rice: 200,
      chicken: 300,
      apple: 95,
      bread: 150,
      egg: 70
    };

    return calorieData[foodName.toLowerCase()] || 100;

  } catch (error) {
    console.error("Fetch error:", error);
    return 100;
  }
}


// CALCULATE TOTAL 
function calculateCalories() {
  let total = 0;
  foods.forEach(food => total += food.calories);
  return total;
}


// UPDATE TOTAL 
function updateTotal() {
  totalCaloriesEl.textContent = calculateCalories();
}


// DISPLAY FOODS
function displayFoods() {
  foodList.innerHTML = "";

  foods.forEach((food, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${food.name} - ${food.calories} cal</span>
      <button>Remove</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      deleteFood(index);
    });

    foodList.appendChild(li);
  });

  updateTotal();
}


//  ADD FOOD
async function addFood(event) {
  event.preventDefault();

  const name = foodNameInput.value.trim();
   const caloriesInput = document.getElementById("calories");
  const calories = Number(caloriesInput.value);

  
  if (!name|| ! calories ) return;

  const newFood = { name, calories };

  foods.push(newFood);
  saveFoods();
  displayFoods();

  form.reset();
}


//  DELETE FOOD
function deleteFood(index) {
  foods.splice(index, 1);
  saveFoods();
  displayFoods();
}


//  RESET 
function resetFoods() {
  foods = [];
  saveFoods();
  displayFoods();
}


//  EVENTS 
form.addEventListener("submit", addFood);
resetBtn.addEventListener("click", resetFoods);


//  INIT 
function init() {
  foods = loadFoods();
  displayFoods();
  fetchCaloriesexample();
}

init();

