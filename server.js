const express = require('express'); 
const app = express(); 
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/env_config'); 
const testAPI = require('./db/business'); 

//node server port 
const PORT = process.env.PORT || 3000;  

//express middleware 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//use cookie encoder to save cookies for one day 
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

//initialize passport 
app.use(passport.initialize());
app.use(passport.session());

//use development files 
app.use(express.static('development'))

const authRoutes = require('./routes/auth-routes'); 
app.use('/auth', authRoutes)

//displays dummy html for development only
app.get('/', (req, res) => {
    res.send(express.static('/index.html'))
}); 


app.listen(PORT, (err) => {
    if (err) throw err; 
    console.log(`app listening on port ${PORT}`); 
}); 