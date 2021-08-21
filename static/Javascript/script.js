const menuBtn = document.getElementById('menu-bar');
const navBar = document.querySelector('.navbar');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    navBar.classList.toggle('nav-toggle');
})

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsElt = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealElt = document.getElementById('single-meal');

submit.addEventListener('submit', async (e) => {
    e.preventDefault();
    single_mealElt.innerHTML = "";
    meals.innerHTML = "";
    const item = search.value;
    if (item.trim()) {
        const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)).json();
        if (data.meals == null) {
            resultHeading.innerHTML = `<h2>There is no search results for <span>${item}</span>.<br>Try for other meal.</h2>`;
        } else {
            resultHeading.innerHTML = `<h2>Search results for <span>${item}</span></h2>`;
            mealsElt.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID = "${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                                <p>Click and scroll down to view recipe</p>
                            </div>
                        </div>
                    `).join('');
        }
        search.value = "";
    }
})

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

async function getMealByID(mealID) {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)).json();
    const meal = data.meals[0];
    addMealInfoToDOM(meal);
}

mealsElt.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }
})