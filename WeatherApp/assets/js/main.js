
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      run(position.coords.latitude, position.coords.longitude);
    }, function(error) {
      switch (error.code) {
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    });
  }
}

function run(latitude, longitude) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&APPID=26b679ab7574e8b14d463ce66138c3f1",function(json){
          $("#city").text(json.name);
          $("#country").text(json.sys.country);
          $('#icon').attr('src',"http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
          $('#icon').attr('alt', json.weather[0].description);
          $('#pressure').text(json.main.pressure + " hPa");
          $('#humidity').text(json.main.humidity + "%");
            conversion(json.main.temp, json.wind.speed);
            console.log(json);
        });

}

function conversion(kelvin, wind) {
  var celsius = Number(kelvin) - 273.15;

  //PRE CONFIG TO CELSIUS START
  $('#fahrenheit').css("color","#ccc");
  $('#celsius').css("color","#337ab7");
  $('#wind').text(Math.round((Number(wind) * 3.52) * 100) / 100 + " km/h");
  $("#weather").text(celsius);

  //TEMPERATURE CHECK
  if (celsius >= 35 ) {
     $("body").addClass("veryhot");
  } else if (celsius >= 25) {
    $("body").addClass("hot");
  } else if (celsius >= 15) {
    $("body").addClass("average");
  } else if (celsius >= 5) {
    $("body").addClass("cold");
  } else {
    $("body").addClass("verycold");
  }

  //TOGGLE BETWEN CELSIUS AND FAHRENHEIT
  $('#celsius').on('click', function(){
    $('#fahrenheit').css("color","#ccc");
    $('#celsius').css("color","#337ab7");
    $("#weather").text(celsius);
    $('#wind').text(Math.round((Number(wind) * 3.52) * 100) / 100 + " km/h");

  });
  $('#fahrenheit').on('click', function(){
    $('#fahrenheit').css("color","#337ab7");
    $('#celsius').css("color","#ccc");
    $('#weather').text(Math.round((celsius * 1.8 + 32) * 100) / 100);
    $('#wind').text(Math.round((Number(wind) * 2.2) * 100) / 100 + " mph");
  });

}
