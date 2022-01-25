// API key
ticketAPIkey = "cBrE7HutiGu6X2ZRBbJxAenzvIT7Q498";

// variables to reference to the dom 
citySearched = document.querySelector("#city-search")

// function to handle city submit
var formSubmitHandler = function(event){
    // prevent page from refresh
    event.preventDefault();

    // get vallue from input element
    var cityName = citySearched.value.trim();

    if (cityName){
        //get breweries
        brewrerySearch(cityName);
        // get tickets for sports games

    }
    else {
        // modal to tell them to enter city name 
    }
};


// get brewery data by city 
var brewrerySearch = function(cityName){
    var breweryApi = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

    fetch(breweryApi).then(function(response){
        response.json().then(function(data){

        })
    })
};

// get sports ticket data by city 
var ticketSearch = function(cityName){
    var ticketApi = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityName + "classificationName=sports&apikey=" + ticketAPIkey;
}