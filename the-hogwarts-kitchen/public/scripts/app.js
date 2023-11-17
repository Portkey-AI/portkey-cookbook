window.app = {};

window.addEventListener("DOMContentLoaded", () => {
  console.log("window loaded", app);
});

app.recipeAI = async function () {
  const ingredients = document.getElementById("ingredients");
  const value = ingredients.value;
  ingredients.disabled = true;
  ingredients.placeholder = "⏳Chef is writing recipe for you...";
  const response = await fetch("/api/axios/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: value }),
  });
  const jsonResponse = await response.json();
  ingredients.disabled = false;
  const recipe = JSON.parse(jsonResponse.content);
  await app.renderRecipes(recipe);
  return recipe;
};

app.renderRecipes = async function (recipeData) {
  const recipeContainer = document.querySelector(".recipe");
  const instructions = recipeData.recipe.instructions
    .map((instruction, i) => `<li style="--i:${i};">${instruction}</li>`)
    .join("");
  recipeContainer.innerHTML = `
    <h2>${recipeData.recipe.name}</h2>
    ${instructions}
  `;
};
