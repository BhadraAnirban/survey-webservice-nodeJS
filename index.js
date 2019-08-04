const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


let candidates = [
    {id: 1, name: 'Pranaba', email: 'pranaba@gmail.com', phone: '9999999999', referedBy: 0},
    {id: 2, name: 'Anuradha', email: 'Anuradha@gmail.com', phone: '9954549999', referedBy: 1},
    {id: 3, name: 'Pradip', email: 'Pradip@gmail.com', phone: '9444499999', referedBy: 2},
    {id: 4, name: 'Arnab', email: 'Arnab@gmail.com', phone: '9995656999', referedBy: 1},
    {id: 5, name: 'Shilpi', email: 'Shilpi@gmail.com', phone: '99992626999', referedBy: 2},
    {id: 6, name: 'Jagannath', email: 'Jagannath@gmail.com', phone: '9992699999', referedBy: 1},
];

app.get('/api/candidates', (req, res)=> {
    res.send(candidates);
});

app.get('/api/candidates/:id', (req, res)=> {
    let course = candidates.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        // send is optional
    }
    else
    {
        res.send(course);
    }    
});

app.post('/api/candidates', (req, res) => {
    
    const candidateschema = {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string(),
        phone: Joi.string(),
        referedBy: Joi.required()
    };
    let result = Joi.validate(req.body, candidateschema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message); // 400: Bad request
    }
    else
    {        
        let course = {
            id: candidates.length + 1,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            referedBy: req.body.referedBy
        }
        candidates.push(course);
        res.send(course);
    }    
});

app.put('/api/candidates/:id', (req, res) => {
    let course = candidates.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        return;
    }
    const candidateschema = {
        name: Joi.string().min(3).max(30).required(),
    };
    let { error } = Joi.validate(req.body, candidateschema); // object destructuring
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/candidates/:id', (req, res) => {
    let course = candidates.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        return;
    }

    const index = candidates.indexOf(course);
    candidates.splice(index, 1);
    res.status(200).send(course);
});

// const port = process.env.PORT || 4100; 
// // env is the environment object and PORT is the variable name.
// app.listen(port, () => {
//     console.log(`server Started at ${port}...`);
// });
module.exports = app;