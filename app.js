var prompt = require('prompt')
    , request = require('request');

// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });

var initPrompt = function(){

   var schema = {
      properties: {
        origin: {
          description: "Where do you want to start?",
          required: true
        },
        destination: {
          description: "Where Are you going?",
          required: true
        },
        transit: {
          description: "How do you want to get there (walk, drive, transit)?",
          pattern: /(walk|drive|transit)$/,
          message: 'Must be one of those options',
          required: true
        }
      }
    };

    prompt.start();
    prompt.get(schema, function (err, result) {
        requestDirection(result);
    });

}; // end initPrompt

var requestDirection = function(properties){

  console.log("requestDirection", properties);
  var url = "http://maps.googleapis.com/maps/api/directions/json?"+
                "origin="+properties.origin+"&destination="+properties.destination+"&sensor=false&departure_time="+properties.timestamp+"&mode="+properties.transit;

  var options = {
    url: url,
    json: true
  };

    request(options, function (error, response, body){

        if (error || response.statusCode !== 200 || body.status === "ZERO_RESULTS" ) {
            console.log("SOMETHING IS NOT GOOD!", error, body);
        }
        else {
            handleReponse(body);
        }
    });
};// end requestDirection

var handleReponse = function(response){
  console.log("handleReponse", response);
  var route = response.routes[0].legs[0];
  console.log("You're leaving at:", route.departure_time.text);
};


//initPrompt();
requestDirection({
  origin: "1740 broadway, nyc",
  destination: "248 14th st, brooklyn",
  transit: "transit", 
  timestamp: Math.floor(new Date().getTime()/1000)
});
