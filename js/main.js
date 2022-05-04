const getRecipeBtn = document
  .getElementById("getRecipe")
  .addEventListener("click", getRecipe);

function clearField() {
  document.querySelector("#searchTerm").value = "";
}

async function getRecipe() {
  document.querySelector("#recipe1").innerHTML = "";
  try {
    const userChoice = document.querySelector("#searchTerm").value;
    const url = `https://api.edamam.com/search?q=${userChoice}&app_id=%efe3aba1%`;
    const foodItem = await fetch(url);
    const foodItemData = await foodItem.json();
    console.log(foodItemData);

    for (let j = 0; j < foodItemData.hits.length; j++) {
      createIngredients(foodItemData.hits[j]);
    }

    clearField();
  } catch (err) {
    console.log(err);
  }
}

const createIngredients = (meal) => {
  const ingredients = [];
  for (let i = 0; i <= 20; i++) {
    if (meal.recipe.ingredientLines[`${i}`]) {
      ingredients.push(meal.recipe.ingredientLines[`${i}`]);
    } else {
      break;
    }
  }

  document.querySelector("#recipe1").insertAdjacentHTML(
    "beforeend",
    `
   <div class="entireContainer">
    <div class="card">
      <div class="leftContainer">
          <div class="profile-main">
              <h2 class="profile-name">${meal.recipe.label}</h2>
              <p class="profile-position"><strong>Cuisine:</strong>${
                meal.recipe.cuisineType
              }</p>
              <p class="profile-position"><strong>Type of Dish:</strong> ${
                meal.recipe.dishType
              }</p>
              <p class="profile-position"><strong>Source:</strong>${
                meal.recipe.source
              }</p>
              <p class="profile-position"><strong>Total Calories:</strong>${meal.recipe.calories.toFixed(
                2
              )}</p>
              <ul class="recipe-card__nav">
              <a href="${
                meal.recipe.url
              }" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>
            
          </ul>
          </div>
      </div>
      <div class="rightContainer">
        <div class="profile-sidebar">
            <img class="profile-image" src="${
              meal.recipe.image
            }"  onerror="this.onerror=null;this.src='../images/plate.jpg';" width=70% alt="recipe image">
           
          
         </div>
      </div>
      <div class"bottomContainer">
      <h3 class="ingredientsHeader">Ingredients:</h3>
        <div class="recipe-card__ingredients">
         
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
         
         </div>
      </div>
            
        
          
        </div>
    </div>`
  );
};
