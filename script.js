var cityInput = document.getElementById("city-input");
var lat = 0;
var lng = 0;

$("#searchButton").on("click", function () {
    
    console.log(cityInput.value);

    fetch('https://open.mapquestapi.com/geocoding/v1/address?key=roGqv4kTHPoSVNTzzl7cTbyMNx2B7A5X&location=' + cityInput.value)
        
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.results[0].locations[0].latLng)
            lat = data.results[0].locations[0].latLng.lat;
            lng = data.results[0].locations[0].latLng.lng;
            update();
        })

});

function update(){
    
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&units=imperial&appid=bc6666ba49703d9bc43c8a571875f5a6')
        
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            $("#currentCity").text(cityInput.value);
            $("#currentTemp").text("Temp (F): " + data.current.temp)
            $("#currentWind").text("Wind (MPH): " + data.current.wind_speed)
            $("#currentHum").text("Humidity (%): " + data.current.humidity)
            $("#currentUV").text("UV Index: " + data.current.uvi)
            $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

            $(".forecast").empty();

            for(i = 1; i < 6; i++){
                var newDay = document.createElement("div");
                $(newDay).addClass("card col p-3 m-3");
                $(newDay).append("<img class = 'bg-secondary rounded' src = 'https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png' width=50 height=50 >");
                $(newDay).append("<li>Temp: " + data.daily[i].temp.day + "</li>");
                $(newDay).append("<li>Wind: " + data.daily[i].wind_speed + "</li>");
                $(newDay).append("<li>Humidity: " + data.daily[i].humidity + "</li>");

                $(".forecast").append(newDay);
            }
        })

}
