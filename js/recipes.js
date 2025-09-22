// Recipe Data
const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    category: "breakfast",
    description: "Simple and nutritious avocado toast.",
    image: "images/avocado-toast.jpg",
    ingredients: ["2 slices whole grain bread", "1 avocado", "Salt", "Pepper", "Lemon juice"],
    steps: [
      "Toast the bread.",
      "Mash the avocado with salt, pepper, and lemon juice.",
      "Spread avocado mix on toast.",
      "Serve immediately."
    ],
    nutrition: { calories: 250, carbs: "30g", protein: "6g", fat: "12g" }
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    category: "lunch",
    description: "Fresh salad with grilled chicken breast.",
    image: "images/chicken-salad.jpg",
    ingredients: ["1 chicken breast", "Mixed greens", "Cherry tomatoes", "Olive oil", "Balsamic vinegar"],
    steps: [
      "Grill chicken until cooked.",
      "Slice chicken and arrange over greens.",
      "Add cherry tomatoes.",
      "Drizzle with olive oil and balsamic vinegar."
    ],
    nutrition: { calories: 400, carbs: "15g", protein: "35g", fat: "18g" }
  },
  {
    id: 3,
    title: "Fruit Smoothie",
    category: "smoothie",
    description: "Refreshing berry smoothie.",
    image: "images/smoothie.jpg",
    ingredients: ["Banana", "Mixed berries", "Yogurt", "Honey"],
    steps: [
      "Blend all ingredients until smooth.",
      "Pour into a glass.",
      "Serve immediately."
    ],
    nutrition: { calories: 200, carbs: "35g", protein: "5g", fat: "2g" }
  },
  {
    id: 4,
    title: "Chicken Stir Fry",
    category: "dinner",
    description: "Quick and healthy chicken stir fry.",
    image: "images/chicken-stir-fry.jpg",
    ingredients: ["Chicken breast", "Broccoli", "Bell peppers", "Soy sauce", "Olive oil"],
    steps: [
      "Heat oil in a pan.",
      "Cook chicken until done.",
      "Add vegetables and stir fry.",
      "Add soy sauce and serve."
    ],
    nutrition: { calories: 350, carbs: "20g", protein: "30g", fat: "10g" }
  }
];

// DOM References
const recipesContainer = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");
const modal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModal");

// Display Recipes Function
function displayRecipes(filterCategory = "all", searchTerm = "") {
  recipesContainer.innerHTML = "";

  const filtered = recipes.filter(r => {
    const matchCategory = filterCategory === "all" || r.category === filterCategory;
    const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    recipesContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align:center;">No recipes found.</p>`;
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='images/placeholder.jpg';">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
    `;
    card.addEventListener("click", () => openModal(recipe));
    recipesContainer.appendChild(card);
  });
}

// Modal Functions
function openModal(recipe) {
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalImage").src = recipe.image;

  const ingredientsList = document.getElementById("modalIngredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingredientsList.appendChild(li);
  });

  const stepsList = document.getElementById("modalSteps");
  stepsList.innerHTML = "";
  recipe.steps.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    stepsList.appendChild(li);
  });

  document.getElementById("modalCalories").textContent = recipe.nutrition.calories;
  document.getElementById("modalCarbs").textContent = recipe.nutrition.carbs;
  document.getElementById("modalProtein").textContent = recipe.nutrition.protein;
  document.getElementById("modalFat").textContent = recipe.nutrition.fat;

  modal.style.display = "flex";
}

closeModalBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// Search & Filter
searchBar.addEventListener("input", () => displayRecipes(categoryFilter.value, searchBar.value));
categoryFilter.addEventListener("change", () => displayRecipes(categoryFilter.value, searchBar.value));

// Initial Load
displayRecipes();