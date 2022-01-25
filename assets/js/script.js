// variables to reference to the dom 
citySearched = document.querySelector("#city-search");
searchBtn = document.querySelector("#search-btn");
cityList = document.querySelector("#previous-city-list");
clearHistoryBtn = document.querySelector("#clear-history-btn");

// function to handle city submit
var formSubmitHandler = function(event){
    // prevent page from refresh
    event.preventDefault();

    // get value from input element
    var cityName = citySearched.value.trim();

    brewerySearch(cityName);
    ticketSearch(cityName);
    saveSearch();
};


// get brewery data by city 
var brewerySearch = function(cityName){
    var breweryApi = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

    fetch(breweryApi).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
};

// get sports ticket data by city 
var ticketSearch = function(cityName){
    var ticketApi = "https://app.ticketmaster.com/discovery/v2/events.json?city=Memphis&classificationName=sports&apikey=cBrE7HutiGu6X2ZRBbJxAenzvIT7Q498";

    fetch(ticketApi).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })

};

// make an array for searched cities to put into local storage
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// store searches to local storage 
var saveSearch = function(){

    // get city name entered
    var cityName = citySearched.value.trim();

    if (cities.indexOf(cityName) == -1){
        cities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    // add searched cities to list
    cityList.innerHTML = "";

    for (var i = 0; i < cities.length; i++){
        var city = cities[i];
        var button = document.createElement("button");
        button.textContent = city;
        button.classList.add("btn");
        cityList.appendChild(button);

        button.addEventListener("click", cityClickHanlder);
    }
};

// function to clear history from local storage
clearHistoryBtn.addEventListener("click", function(){
    localStorage.clear();
    cities = [];
});

// function to load city from past search
var cityClickHanlder = function(event){
    var cityName = event.target.textContent;
    ticketSearch(cityName);
    brewerySearch(cityName);

};

// add event listener to submit button 
searchBtn.addEventListener("click", formSubmitHandler);