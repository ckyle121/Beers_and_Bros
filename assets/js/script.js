// api key
ticketAPIKey = "cBrE7HutiGu6X2ZRBbJxAenzvIT7Q498";

// variables to reference to the dom 
cityInput = document.querySelector("#city-input");
searchBtn = document.querySelector("#search-btn");
cityList = document.querySelector("#previous-city-list");
clearHistoryBtn = document.querySelector("#clear-history-btn");
breweryList = document.querySelector("#brewery-list");
ticketList = document.querySelector("#ticket-list");

// function to handle city submit
var formSubmitHandler = function(event){
    // prevent page from refresh
    event.preventDefault();


    // get value from input element
    var cityName = cityInput.value.trim();

    brewerySearch(cityName);
    ticketSearch(cityName);
    saveSearch();
};


// get brewery data by city 
var brewerySearch = function(cityName){
    var breweryApi = "https://api.openbrewerydb.org/breweries?by_city=" + cityName + "&per_page=20";
    
    fetch(breweryApi).then(function(response){
        response.json().then(function(data){

            // clear historical data 
            breweryList.innerHTML = "";

            // loop through brewery data
            for (var i = 0; i < data.length; i++){
                
                // create div element for Brewery Card Div
                var breweryEl = document.createElement("div");
                breweryEl.classList.add("brewery-card");

                // create h6 element for Brewery Name 
                var breweryName = document.createElement("h5");

                // create a element for h6 
                var breweryWebsite = document.createElement("a");
                breweryWebsite.setAttribute("href", data[i].website_url);
                breweryWebsite.setAttribute("target", "_blank");
                breweryWebsite.textContent = data[i].name;
                
                // append a element to h6
                breweryName.append(breweryWebsite);

                // create p element for Brewery Address
                var breweryAddress = document.createElement("p");
                var street = data[i].street; 
                if (street == null){
                    breweryAddress.innerHTML = data[i].city + ", " + data[i].state + " " + data[i].postal_code.substr(0,5);
                } else {
                    breweryAddress.innerHTML = street + ", " + data[i].city + ", " + data[i].state + " " + data[i].postal_code.substr(0,5);
                };

                // append name, address, website url to brewery card div
                breweryEl.append(breweryName);
                breweryEl.append(breweryAddress);

                // append brewery card div to brewery list 
                breweryList.append(breweryEl);
            }
        })
    })
};

// function to account for military time
var timeConverter = function(input){
    return moment(input, "HH:mm:ss").format("h:mm A")
}

// get sports ticket data by city 
var ticketSearch = function(cityName){

    var ticketApi = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityName + "&classificationName=sports&sort=date,asc&size=10&apikey=" + ticketAPIKey;

    fetch(ticketApi).then(function(response){
        response.json().then(function(data){
            console.log(data);
            // clear historical data 
            ticketList.innerHTML = "";

            // loop through ticket data 
            for (var i = 0; i < data._embedded.events.length; i++){

                // create div element for Ticket Card Div 
                ticketEl = document.createElement("div");
                ticketEl.classList.add("ticket-card");

                // create h6 element for Game Name 
                var ticketName = document.createElement("h5");
                ticketName.textContent = data._embedded.events[i].name;

                // create p element for Game Time 
                var gameTime = document.createElement("p");
                localTime = data._embedded.events[i].dates.start.localTime;
                if (localTime == null){
                    gameTime.textContent = new Date(data._embedded.events[i].dates.start.localDate).toLocaleDateString();
                } else{
                    gameTime.textContent = timeConverter(localTime) + " " + new Date(data._embedded.events[i].dates.start.localDate).toLocaleDateString();
                };
                
                // create link for ticketmaster 
                var ticketLink = document.createElement("a");
                ticketLink.setAttribute("href", data._embedded.events[i].url);
                ticketLink.setAttribute("target", "_blank");
                ticketLink.textContent = "Click Here to get tickets from Ticketmaster";
                

                // append game name, time, tickets, starting price to Ticket Card Div
                ticketEl.append(ticketName);
                ticketEl.append(gameTime);
                ticketEl.append(ticketLink);

                // append Ticket Card Div to ticket list 
                ticketList.append(ticketEl);
            }
        })
    })
};

// function to load city from past search
var cityClickHanlder = function(event){
    var cityName = event.target.textContent;
    ticketSearch(cityName);
    brewerySearch(cityName);

};

// make an array for searched cities to put into local storage
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// store searches to local storage 
var saveSearch = function(){

    // get city name entered
    var cityName = cityInput.value.trim();

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
        button.classList.add("btn", "mb-2");
        cityList.appendChild(button);

        button.addEventListener("click", cityClickHanlder);
    }
};

// function to clear history from local storage
clearHistoryBtn.addEventListener("click", function(){
    localStorage.clear();
    cities = [];
    location.reload();
});

// add event listener to submit button 
searchBtn.addEventListener("click", formSubmitHandler);

