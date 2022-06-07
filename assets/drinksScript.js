// drinks
// our global var's
var searchResultsEl = document.querySelector('#search-results');
// var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var searchForm = document.querySelector('#drink-search-form');


// drink api url with a blank "="(equals) so that the user can search anything. 
// var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + qInput.value;

var getSearchResults = function (q, format) {
    var searchURL;

    if (format) {
        searchURL = "https://www.thecocktaildb.com/" + format + "/?q=" + q + "&fo=json";
    } else {
        searchURL = "https://www.thecocktaildb.com/search/?q" + q + "&fo=jason"
    }
}

// Sasha's code
function getIngredients(obj) {
    return Object
        .keys(obj)
        .filter(key => key.includes("Ingredient"))
        .map(ingredient => obj[ingredient])
        .filter(ingredient => ingredient);
}

function getApi(event) {
    event.preventDefault();
    var qInput = document.querySelector('#q-drink');
    var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + qInput.value;
    fetch(drinkURL)
        .then(function (response) {
            return response.json();
        })
        .then(function ({ drinks }) {
            searchResultsEl.innerHTML = null;
            console.log(drinks);

            for (var drink of drinks) {
                var ingredients = getIngredients(drink);
                var ulEl = document.createElement('ul');
                for (var ingredient of ingredients) {
                    var liEl = document.createElement('li');
                    liEl.textContent = ingredient;
                    ulEl.appendChild(liEl);
                }
                console.log(drink)

                var articleEl = document.createElement('article');
                articleEl.className = "card p-3 my-3 bg-dark text-light";

                var h3El = document.createElement('h3');
                h3El.textContent = drink.strDrink;

                var pEl = document.createElement('p');
                pEl.textContent = drink.strInstructions;

                var btnEl = document.createElement('a');
                btnEl.className = "btn btn-light text-dark";
                btnEl.textContent = "Click Image";
                btnEl.setAttribute('href', drink.strDrinkThumb);

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                articleEl.appendChild(btnEl);
            }

        });
};

var init = function () {
    for (let i = 0; i < 10; i++) {   

    
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data.drinks[0])
                var ingredients = getIngredients(data.drinks[0]);
                console.log(ingredients)
                // var articleEl = document.createElement("article");
                // articleEl.className = "card p-3 my-3 bg-dark text-light";
                var pEl = document.createElement('p')
                // pEl.className = "card p-3 bg-dark text-light";
                pEl.textContent = data.drinks[0].strDrink
                var instructions = document.createElement('p')
                instructions.textContent = data.drinks[0].strInstructions
                // articleEl.appendChild(pEl);
                // articleEl.appendChild(instructions);
                // articleEl.appendChild(ingredients);
                searchResultsEl.appendChild(pEl)
                searchResultsEl.appendChild(instructions)
                for (var ingredient of ingredients) {
                    var ingredientsEl = document.createElement('p')
                    ingredientsEl.textContent = ingredient
                    searchResultsEl.appendChild(ingredientsEl)
    
                }
            }) 
            .catch(function (error) {
                console.log(error);
            });
    } 


}

// var searchHandle = function(event) {
//     event.preventDefault();
//     var q = qInput.value.trim();
//     var format = formatInput.value;

//     if(!q) return;

//     if (searchResultsEl) {
//         getSearchResults(q, format);
//     } else {
//         location.replace("index.html?q=" + q + "&format=" + format);
//     }
// }

searchForm.addEventListener("submit", getApi);

init();