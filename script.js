const form = document.getElementById("foodForm");
const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

// Load from localStorage
let foods = JSON.parse(localStorage.getItem("foods")) || [];

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("foods", JSON.stringify(foods));
}

// Calculate total calories
function calculateTotal() {
  const total = foods.reduce((sum, item) => sum + item.calories, 0);
  totalCaloriesEl.textContent = total;
}

// Display foods
function renderFoods() {
  foodList.innerHTML = "";

  foods.forEach((food, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${food.name} - ${food.calories} cal</span>
      <button>Remove</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      removeFood(index);
    });

    foodList.appendChild(li);
  });

  calculateTotal();
}

// Add food
function addFood(e) {
  e.preventDefault();

  const name = foodNameInput.value.trim();
  const calories = Number(caloriesInput.value);

  if (!name || !calories) return;

  foods.push({ name, calories });

  saveToStorage();
  renderFoods();
  form.reset();
}

// Remove food
function removeFood(index) {
  foods.splice(index, 1);
  saveToStorage();
  renderFoods();
}

// Reset all
function resetAll() {
  foods = [];
  saveToStorage();
  renderFoods();
}

// Simulated Fetch API
async function fetchCaloriesExample() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Events
form.addEventListener("submit", addFood);
resetBtn.addEventListener("click", resetAll);

// Initial load
renderFoods();
fetchCaloriesExample();