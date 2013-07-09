var prompt = require('prompt');


 var schema = {
    properties: {
      transit: {
        description: "How do you want to get there (walk, drive, transit)?",
        pattern: /(walk|drive|transit)$/,
        message: 'Must be one of those options',
        required: true
      },
      origin: {
        description: "Where do you want to start?",
        required: true
      },
      destination: {
        description: "Where Are you going?",
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
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  name: ' + result.name);
    console.log('  password: ' + result.password);
  });