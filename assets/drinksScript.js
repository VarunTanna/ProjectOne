// drinks
// our global var's
var searchResultsEl = document.querySelector('#search-results-drinks');
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
    console.log("test drink")
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

                var imgEl = document.createElement('img');
                imgEl.style.height = '300px';
                imgEl.style.width = '300px';
                imgEl.setAttribute('src', drink.strDrinkThumb);

                // var btnEl = document.createElement('a');
                // btnEl.className = "btn btn-light text-dark";
                // btnEl.textContent = "Click for a Image!";
                // btnEl.setAttribute('href', drink.strDrinkThumb);

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                // articleEl.appendChild(btnEl);
                articleEl.appendChild(imgEl);
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
                console.log(data) 
                var drink = data.drinks[0];
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

                var imgEl = document.createElement('img');
                imgEl.style.height = '300px';
                imgEl.style.width = '300px';
                imgEl.setAttribute('src', drink.strDrinkThumb);

                // var btnEl = document.createElement('a');
                // btnEl.className = "btn btn-light text-dark";
                // btnEl.textContent = "Click for a Image!";
                // btnEl.setAttribute('href', drink.strDrinkThumb);

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                // articleEl.appendChild(btnEl);
                articleEl.appendChild(imgEl);
                
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

init();
searchForm.addEventListener("submit", getApi);
