const app = require('./index');

const port = process.env.PORT || 2600; 
// env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`server Started at ${port}...`);
});