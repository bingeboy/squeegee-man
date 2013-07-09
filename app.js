var prompt = require('prompt')
    , request = require('request');

// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });


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

  //
  // Start the prompt
  //
  prompt.start();

  //
  // Get two properties from the user: email, password
  //
  prompt.get(schema, function (err, result) {

    var url = "http://maps.googleapis.com/maps/api/directions/json?"+
              "origin="+result.origin+"&destination="+result.destination+"&sensor=false&departure_time=1343605500&mode="+result.transit;
    console.log("url", url);

	request(url, function (error, response, body){ 
			  if (!error && response.statusCode == 200) {
				      console.log(body) // log the body
		      }
	});

  });
