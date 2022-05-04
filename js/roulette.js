const getRecipeBtn = document
  .getElementById("getRecipe")
  .addEventListener("click", getRecipe);
const recipeContainer = document.getElementById("meal");

async function getRecipe() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const recipeItem = await fetch(url);
    const recipeItemData = await recipeItem.json();
    console.log(recipeItemData);
    createMeal(recipeItemData.meals[0]);
  } catch (error) {
    console.log(error);
  }
}

const createMeal = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const newInnerHTML = `
    <div class="secondContainer">
    <div class="recipe-card">
          <div style="background: url(${
            meal.strMealThumb
          })no-repeat 50% 50%;background-size: cover;
          height: 200px;
        "></div>
          <div class="recipe-card__body">
            <h1 class="recipe-card__heading">${meal.strMeal}</h1>
            <ul class="recipe-card__nav">
              <li>
                <h3 id="ingredientsActive" class="active">Ingredients</h3>
              </li>
              <li>
                <h3 id="instructionsActive" >Instructions</h3>
              </li>
            </ul>
            <ul class="recipe-card__ingredients active" >
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
            </ul>
            <ul class="recipe-card__instructions hidden-element">
            <p>${meal.strInstructions}</p>
            </ul>
            ${
              meal.strYoutube
                ? `
            <div class="row">
                <h5 class="videoLabel active">Video Recipe</h5>
                <div class="videoWrapper">
                    <iframe 
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}">
                    </iframe>
                </div>
            </div>`
                : ""
            }
          </div>
        </div>
      </div>`;

  recipeContainer.innerHTML = newInnerHTML;

  const ingredientsToggle = document.querySelector("#ingredientsActive");
  ingredientsToggle.addEventListener("click", showIngredients);

  function showIngredients() {
    document
      .querySelector(".recipe-card__instructions")
      .classList.add("hidden-element");
    document
      .querySelector(".recipe-card__ingredients")
      .classList.remove("hidden-element");
    document.querySelector("#instructionsActive").classList.remove("active");
    document.querySelector("#ingredientsActive").classList.add("active");
  }

  const instructionsToggle = document.querySelector("#instructionsActive");
  instructionsToggle.addEventListener("click", showInstructions);

  function showInstructions() {
    document
      .querySelector(".recipe-card__ingredients")
      .classList.add("hidden-element");
    document
      .querySelector(".recipe-card__instructions")
      .classList.remove("hidden-element");
    document.querySelector("#ingredientsActive").classList.remove("active");
    document.querySelector("#instructionsActive").classList.add("active");
  }
};
