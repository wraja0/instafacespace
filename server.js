// Imports
// Express
const express = require('express');
const app = express();

//Method Override 
const methodOverride = require('method-override');
const controllers = require('./controllers');
const db = require('./models/');
// Port Var
const PORT =process.env.PORT || 4000;
// View Engine 
app.set('view engine', 'ejs');
// Middleware to fetch req.body
app.use(express.urlencoded({ extended: false }));
// Static file middleware
app.use(express.static('public'));
// Method Override middleware
app.use(methodOverride('_method'))

//use user controller
app.use('/users',controllers.User);
// use posts controller 
app.use('/users/:userid/posts',controllers.Post)
app.get ('/', (req,res)=>{
    res.redirect('/users');
})
// Route for unknown directories 
app.get('/*', (req,res)=>{
    res.send(`404 error: Where are you trying to go buddy? <a href="/home">here</a> maybe?`);
})
// App Listener 
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}.`);
})