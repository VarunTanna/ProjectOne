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
function getIngredients(obj) {
    return Object
        .keys(obj)
        .filter(key => key.includes("Ingredient"))
        .map(ingredient => obj[ingredient])
        .filter(ingredient => ingredient);
}


function getApi(event) {
    event.preventDefault();
    var qInput = document.querySelector('#q');
    console.log(qInput.value);
    var foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + qInput.value;
    var foodStorage = JSON.parse(window.localStorage.getItem("storedFoods")) || [];
    var searchItem = qInput.value.toLowerCase();
    console.log(searchItem);
    console.log(foodStorage);
    if (!foodStorage.includes(searchItem)) {
        foodStorage.push(searchItem);

    }
    window.localStorage.setItem("storedFoods", JSON.stringify(foodStorage));



    fetch(foodURL)
        .then(function (response) {
            return response.json();
        })
        .then(function ({ meals }) {
            searchResultsEl.innerHTML = null;
            console.log(meals);
    

            if (meals != null) {
                for (var meal of meals) {
                    var ingredients = getIngredients(meal);
                    var ulEl = document.createElement('ul');
                    for (var ingredient of ingredients) {
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

                    var btnEl = document.createElement('img');
                    btnEl.className = "youtubeimg";
                    // btnEl.textContent = "Click for Youtube video!";
                    // btnEl.setAttribute('src', URL('youtube.png'))
                    btnEl.setAttribute('src', './youtube.png')

                    var aEl = document.createElement('a');
                    aEl.setAttribute('href', meal.strYoutube);
                    aEl.classList.add("d-flex", "justify-content-center");
                    aEl.appendChild(btnEl);


                    articleEl.appendChild(h3El);
                    articleEl.appendChild(pEl);
                    articleEl.appendChild(ulEl);
                    searchResultsEl.appendChild(articleEl);
                    articleEl.appendChild(aEl);
                }

            }
        });
};


var init = function () {

    for (let i = 0; i < 10; i++) {
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

                var btnEl = document.createElement('img');
                btnEl.className = "youtubeimg";
                btnEl.setAttribute('src', './youtube.png');

                var aEl = document.createElement('a');
                aEl.setAttribute('href', meal.strYoutube);
                aEl.classList.add("d-flex", "justify-content-center");
                aEl.appendChild(btnEl);

                articleEl.appendChild(h3El);
                articleEl.appendChild(pEl);
                articleEl.appendChild(ulEl);
                searchResultsEl.appendChild(articleEl);
                articleEl.appendChild(aEl);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


let savedFoods = JSON.parse(window.localStorage.getItem("storedFoods")) || [];
var ulEl = document.getElementById("storedList");


for (let i = 0; i < savedFoods.length; i++) {
    const element = savedFoods[i];
    console.log(element);
    var liEl = document.createElement('button');
    liEl.classList.add("list-group-item")
    liEl.textContent = element
    ulEl.appendChild(liEl);
}





// changed the drinkURL's to foodURL's


init();
searchForm.addEventListener("submit", getApi);
