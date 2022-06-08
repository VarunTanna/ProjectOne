// food

var searchResultsEl = document.querySelector('#search-results');
// var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var searchForm = document.querySelector('#food-search-form');

// var foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + qInput.value;

var getSearchResults = function (q, format) {
    var searchURL;

    if (format) {
        searchURL = "https://www.themealdb.com/" + format + "/?q=" + q + "&fo=json";
    } else {
        searchURL = "https://www.themealdb.com/search/?q=" + q + "&fo=json";
    }
}

// function getApi() {
//     event.preventDefault();
//     fetch(drinkURL)
//         .then((response) => {
//             console.log("we got a response");
//             console.log(response);
//             return response.json();
//         })
//         .then((jsonData) => {
//             console.log("we got data");
//             console.log(jsonData);
//         });
// }

// var articleEl = document.createElement("article");
// articleEl.className = "card p-3 my-3 bg-dark text-light";

// var h3El = document.createElement('h3');
// h3El.textContent = result.title;

// var pEl = document.createElement('p');
// pEl.textContent = result.description[0];

// var btnEl = document.createElement('button');
// btnEl.className = "btn btn-light text-dark";
// btnEl.textContent = "Learn More"

// articleEl.append(h3El, pEl, btnEl);
// searchResultsEl.append(articleEl);

// Sasha's code
function getIngredients(obj){
    return Object
        .keys(obj)
        .filter(key=>key.includes("Ingredient"))
        .map(ingredient=>obj[ingredient])
        .filter(ingredient=>ingredient);
}


function getApi(event) {
    event.preventDefault();
    var qInput = document.querySelector('#q');
    console.log(qInput.value);
    var foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + qInput.value;

    fetch(foodURL)
        .then(function (response) {
            return response.json();
        })
        .then(function ({meals}) {
            searchResultsEl.innerHTML = null;
            console.log(meals);
            for (var meal of meals) {
                var ingredients = getIngredients(meal);
                var ulEl = document.createElement('ul');
                for(var ingredient of ingredients){
                    var liEl = document.createElement('li');
                    liEl.textContent = ingredient;
                    ulEl.appendChild(liEl);
                }
                console.log(meal)
                /*
                <article class="card p-3 my-3 bg-dark text-light">
                  <h3>Story Title</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ex, quisquam quasi aliquam iste nihil temporibus inventore unde, itaque sapiente error nesciunt nostrum modi. Ducimus placeat repellat voluptatibus adipisci rerum.</p>
                  <button class="btn btn-light text-dark">Learn More</button>
                </article>
                */
                var articleEl = document.createElement('article');
                articleEl.className = "card p-3 my-3 bg-dark text-light";

                var h3El = document.createElement('h3');
                h3El.textContent = meal.strMeal;

                var pEl = document.createElement('p');
                pEl.textContent = meal.strInstructions;

                var btnEl = document.createElement('a');
                btnEl.className = "btn btn-light text-dark";
                btnEl.textContent = "Learn More";
                btnEl.setAttribute('href', meal.strYoutube)

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                articleEl.appendChild(btnEl);
            }
        });
};  


var init = function () {

    for(let i = 0; i < 10; i++) {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var meal = data.meals[0];
            var ingredients = getIngredients(meal);
            var ulEl = document.createElement('ul');
            for (var ingredient of ingredients) {
                var liEl = document.createElement('li');
                liEl.textContent = ingredient
                ulEl.appendChild(liEl);
            }
            console.log(meal)
            
            var articleEl = document.createElement('article');
                articleEl.className = "card p-3 my-3 bg-dark text-light";

                var h3El = document.createElement('h3');
                h3El.textContent = meal.strMeal;

                var pEl = document.createElement('p');
                pEl.textContent = meal.strInstructions;

                var btnEl = document.createElement('a');
                btnEl.className = "btn btn-light text-dark";
                btnEl.textContent = "Click Image";
                btnEl.setAttribute('href', meal.strYoutube);

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                articleEl.appendChild(btnEl);
             })
             .catch(function (error) {
                 console.log(error);
             });
    }
}

// changed the drinkURL's to foodURL's


init();
searchForm.addEventListener("submit", getApi);
