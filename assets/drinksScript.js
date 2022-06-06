// drinks
// our gobal var's
var searchResultsEl = document.querySelector('#search-results');
var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var searchForm = document.querySelector('#loc-search-form');


// drink api rul with a blank "="(equals) so that the user can search anything. 
var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + qInput.value;

var getSearchResults = function (q, format) {
    var searchURL;

    if (format) {
        searchURL = "https://www.thecocktaildb.com/" + format + "/?q=" + q + "&fo=json";
    } else {
        searchURL = "https://www.thecocktaildb.com/search/?q" + q + "&fo=jason"
    }
}

// Sasha's code
function getIngredients(obj){
    return Object
    .keys(obj)
    .filter(key=>key.includes("Ingredients"))
    .map(ingredient=>obj[ingredient])
    .filter(ingredient=>ingredient);
}

function getApi(event) {
    event.preventDefault();

    fetch(drinkURL)
    .then(function(response) {
        return response.json();
    })
    .then(function ({idDrink}) {
        searchResultsEl.innerHTML = null;
        console.log(idDrink);
        // something isnt working in line 42
        for (var drink of idDrink) {
            var ingredients = getIngredients(idDrink);
            var ulEl = document.createElement('ul');
            for (var ingredient of ingredients) {
                var liEl = document.createElement('li');
                liEl.textContent = ingredient;
                ulEl.appendChild(liEl);
            }
            console.log(idDrink)

            var articleEl = document.createElement('article');
                articleEl.className = "card p-3 my-3 bg-dark text-light";

                var h3El = document.createElement('h3');
                h3El.textContent = idDrink.strDrink;

                var pEl = document.createElement('p');
                pEl.textContent = drink.strInstructions;

                var btnEl = document.createElement('button');
                btnEl.className = "btn btn-light text-dark";
                btnEl.textContent = "Learn More";

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(btnEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
        }

    });
};


searchForm.addEventListener("submit", getApi);