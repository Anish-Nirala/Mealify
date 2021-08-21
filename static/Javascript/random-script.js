const menuBtn = document.getElementById('menu-bar');
const navBar = document.querySelector('.navbar');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    navBar.classList.toggle('nav-toggle');
})

const mealsElt = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealElt = document.getElementById('single-meal');


function addMealInfoToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    single_mealElt.innerHTML = `
            <div class="line"></div>
            <div class="single-meal">
                <h1>${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="single-meal-info">
                    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
                </div>
                <div class="main">
                    <h2>Receipe</h2>
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            </div>
            `;
}
window.addEventListener('load', async () => {
    mealsElt.innerHTML = '';
    resultHeading.innerHTML = '';
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)).json();
    const meal = data.meals[0];
    addMealInfoToDOM(meal);
})