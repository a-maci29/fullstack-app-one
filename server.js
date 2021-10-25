const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const BSON = require('bson');
const passport = require('passport');


var db, collection;

const url = "mongodb+srv://user-one:BlueMoon@cluster0.5xllp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "producebyseason";

const produce = ['apple', 'acorn squash', 'apricot', 'asparagus', 'artichoke', 'broccoli', 'brussel sprouts', 'beets', 'blueberry', 'blackberry', 'butternut squash', 'cabbage', 'cauliflower', 'corn', 'cantaloupe', 'cranberry', 'cucumber', 'cherrie', 'eggplant', 'grapefruit', 'grapes', 'kiwi', 'leeks', 'lemon', 'lettuce', 'mango', 'mushroom', 'okra', 'orange', 'pear', 'parsnip', 'persimmon', 'pomegranate', 'papaya', 'plums', 'pepper', 'peach', 'rutabaga', 'radish', 'strawberry', 'sweet potato', 'spinach', 'turnip', 'tangerine', 'tangerine', 'winter squash']


app.set('view engine', './src/views');

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('/', (req, res) => {
  db.collection('products').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {producebyseason: result}) //all the variables that the template can use
    //the variable is "producebyseason" : result is the variable that we are getting the value out of
    //"producebyseason" got passed through the arrow function
    //result was the variable that was in the arrow function
    // %= puts in values, can apply js through here if included
  })
})


app.post('/array', (req, res) => { //matches with the fetch in main.js, line 26
  db.collection('product').findOne({monthname : req.body.month},(err, result) => { //the req.body is what the client sent. the 'month' is the property. req is sending from the browser. the body is the individual element that the browser is sending. the 'month' is the property of the body
    if (err) return console.log(err)
    res.send(result) //no need to render just yet, only receiving the data and letting the client decide what to do from there. sends stuff to the browser
    //sending the data back to the client side that will translate it to json and make it ready to render back into html for the DOM
    console.log(result)
    console.log(req.body.month)
  }) //find(document/object).toArray(month)
}

)

app.get('/login', function(req, res) {
  res.render('login.ejs');
});

app.get('/signup', function(req, res) {
  res.render('signup.ejs');
});
///.findOne({monthname : req.body.month},(err, result)

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
          res.render('login.ejs');
      });

      // process the login form
      app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

      // SIGNUP =================================
      // show the signup form

      // process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}
