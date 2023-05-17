require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const flash = require("connect-flash");

// --------- CONFIGURED MODULES -------------

const { initializePassport, isAuthenticated } = require("./passportConfig.js");
const { connectMongoose, User, Order } = require("./database.js");
const signup = require("./controllers/signup.js");
const login = require("./controllers/login.js");
const {addToCart} = require("./controllers/cart.js");

// -------- IMPORT BCRYPT ----------

const bcrypt = require("bcrypt");
const saltRounds = 10;

// -------- DECLARE EXPRESS USAGE ----------

const app = express();

app.set("view engine", "ejs");

app.use(flash());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- CREATE SESSION ---------

app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//---------- USE PASSPORT ------------

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// --------- CONNECT MONGOOSE ---------

connectMongoose();

// ---------- SIGNUP -----------

app.post("/signup", signup, (req, res) => {

  req.flash("signup-message", req.session.message);
  res.redirect("/login");

});

// ----------- LOGIN PAGE --------------

app.get("/login", login)
.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
    })
    );
    
// ----------- ADD TO CART --------------

app.post("/addtocart", addToCart)
    
// ---------- START SERVER ------------

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
