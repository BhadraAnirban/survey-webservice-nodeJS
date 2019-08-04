# Web service with expressJS
## Deploy in AWS using cloudia
Instead of listen to the express server in index.js file (where you have written the above api code)
Export the module 
```
// const port = process.env.PORT || 4100; 
// app.listen(port, () => {
//     console.log(`server Started at ${port}...`);
// });
module.exports = app;
```

For local use create a new file index.local.js
Import the index file and listen to the express server, as mentioned below-
```
const app = require('./index');

const port = process.env.PORT || 2600; 
// env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`server Started at ${port}...`);
});
```
In the command line if you write node index.local.js locally it will run as espected.
First time Install Claudia globally-
```
npm install claudia –g
```
Then execute the below command from now onwards in all applications
```
claudia generate-serverless-express-proxy --express-module index
```
Here ‘index’ is the javascript file name where you exported the expressjs, that means where you have written the api. i.e. the entry file of expressJS.
It will generate a file called lambda.js
Execute the Claudia create command-
```
claudia create --handler lambda.handler --deploy-proxy-api --region eu-central-1
```
It’s ready. Now onwards to update the server use –
```
Claudia update.
```

## Handle CROSS Origin-
Write the code before the api codes.
```
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
```

### For full ExpressJS code visit -
## https://github.com/BhadraAnirban/nodeJS-webService-expressJS
