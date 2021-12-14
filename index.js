const express = require("express");
const ejs = require("ejs");
const Stopwatch = require("statman-stopwatch");
const mysql = require('mysql');
const { setDefaultResultOrder } = require("dns");
const { type } = require("express/lib/response");
const session = require('express-session');
const passport = require("passport");

const Connection = require("mysql/lib/Connection");
require("./auth");


const q1sw = new Stopwatch();
const q2sw = new Stopwatch();
const q3sw = new Stopwatch();
const q4sw = new Stopwatch();


const db = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b06fb0276dd7b3",
    password: "753b2450",
    database: "heroku_c5dce109e5b80b2"
});



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));






app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(
    session({
        secret: "2p7Pr%#Sfn?wDbRc",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 60 * 60 * 1000},
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
    res.render("index");
});


app.get("/login", (req, res) => {
    res.send('<a href="/auth/google">Login with Google </a>');
});

app.get("/signup", (req, res) => {
    res.render("../views/html/signup_page");
});

app.get("/quiz1", (req, res) => {
    res.render("../views/html/quiz1");
    q1sw.start();
});

app.get("/quiz2", (req, res) => {
    res.render("../views/html/quiz2");
    q2sw.start();
});

app.get("/quiz3", (req, res) => {
    res.render("../views/html/quiz3");
    q3sw.start();
});

app.get("/quiz4", (req, res) => {
    res.render("../views/html/quiz4");
    q4sw.start();
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/protected", // what to do when successful login
      failureRedirect: "auth/failure", // what to do when unsuccesful login
    })
  );

  app.get("/protected", (req, res) => {
    res.render('index');
  });

  app.get("/auth/failure", (req, res) => {
    res.send("You were not authenticated.. Try again next time");
  });


  function isLoggedIn(req, res, next) {
    // Logic: If the req object already has user credential, then pass it onto the next point, else return a 401 status (unauthorized acccess)
    req.user ? next() : res.sendStatus(401);
  }

  
  app.get("/logout", (req, res) => {
    req.logout(); // logs the user out
    req.session.destroy(); // destroy the session created
    res.send("You have been successfully logged out... Goodbye!");
  });

app.post("/", (req, res) => {
    var score = 0;

    

    if (req.body.q1Answer1 == "c"){
        score++;
    }

    if (req.body.q1Answer2 == "d"){
        score++;
    }

    if (req.body.q1Answer3 == "a"){
       score++;
    }

    if (req.body.q1Answer4 == "c"){
        score++;
    }

    if (req.body.q1Answer5 == "b"){
        score++;
    }

    if (req.body.q1Answer6 == "b"){
        score++;
    }

    if (req.body.q1Answer7 == "d"){
        score++;
    }

    if (req.body.q1Answer8 == "b"){
        score++;
    }

    if (req.body.q1Answer9 == "d"){
        score++;
    }

    if (req.body.q1Answer10 == "a"){
        score++;
    }

    q1sw.stop();

    const alpha = q1sw.read();
    const q1Round = (alpha / 1000);

    console.log(score);
    let qf1 = q1Round.toFixed(2) + " seconds"; 

    let data = {score: score, time: qf1}
    let sql = `INSERT INTO q1Stats SET ?`;
    let query = db.query(sql, data, (err, result) => {
        if (err){
            throw err;
        }
        console.log(`stats were added to db`);
        console.log(result);
    });

    
});


app.get("/quizInfo", (req, res) => {
   
        res.render("../views/html/quizzes_page");
   
});

app.post("/q2", (req, res) => {
    var score2 = 0;

    if (req.body.q2Answer1 == "b"){
        score2++;
    }

    if (req.body.q2Answer2 == "d"){
        score2++;
    }

    if (req.body.q2Answer3 == "a"){
       score2++;
    }

    if (req.body.q2Answer4 == "d"){
        score2++;
    }

    if (req.body.q2Answer5 == "c"){
        score2++;
    }

    if (req.body.q2Answer6 == "d"){
        score2++;
    }

    if (req.body.q2Answer7 == "a"){
        score2++;
    }

    if (req.body.q2Answer8 == "b"){
        score2++;
    }

    if (req.body.q2Answer9 == "d"){
       score2++;
    }

    if (req.body.q2Answer10 == "a"){
        score2++;
    }

    const beta = q2sw.read();
    const q2Round = (beta / 1000);

    q2sw.stop();
    console.log(score2);
    
    let qf2 = q2Round.toFixed(2) + " seconds";

    let q2data = {score: score2, time: qf2}
    let q2sql = `INSERT INTO q2Stats SET ?`;
    let q2query = db.query(q2sql, q2data, (err, result) => {
        if (err){
            throw err;
        }
        console.log(`stats were added to db`);
        console.log(result);
    });

    
});

app.post("/q3", (req, res) => {
    var score3 = 0;

    if (req.body.q3Answer1 == "a"){
        score3++;
    }

    if (req.body.q3Answer2 == "c"){
        score3++;
    }

    if (req.body.q3Answer3 == "b"){
        score3++;
    }

    if (req.body.q3Answer4 == "c"){
        score3++;
    }

    if (req.body.q3Answer5 == "d"){
        score3++;
    }

    if (req.body.q3Answer6 == "a"){
        score3++;
    }

    if (req.body.q3Answer7 == "c"){
        score3++;
    }

    if (req.body.q3Answer8 == "d"){
        score3++;
    }

    if (req.body.q3Answer9 == "c"){
        score3++;
    }

    if (req.body.q3Answer10 == "b"){
        score3++;
    }

    if (req.body.wqq1 == "Peter Parker"){
        score3++;
    }

    if (req.body.wqq2 == "Ian Malcolm"){
        score3++;
    }

    if (req.body.wqq3 == "Martin Brody"){
        score3++;
    }

    if (req.body.wqq4 == "Frodo Baggins"){
        score3++;
    }

    if (req.body.wqq5 == "Jules Winnfield"){
        score3++;
    }

    if (req.body.wqq6 == "Dale Doback"){
        score3++;
    }

    if (req.body.wqq7 == "Joker"){
        score3++;
    }

    if (req.body.wqq8 == "John Wick"){
        score3++;
    }

    if (req.body.wqq9 == "Woody"){
        score3++;
    }

    if (req.body.wqq10 == "Uncle Bobby B"){
        score3++;
    }

    q3sw.stop();
    const charlie = q3sw.read();
    const q3Round = (charlie / 1000);

    let qf3 = q3Round.toFixed(2) + " seconds"; 

    let q3data = {score: score3, time: qf3}
    let q3sql = `INSERT INTO q3Stats SET ?`;
    let q3query = db.query(q3sql, q3data, (err, result) => {
        if (err){
            throw err;
        }
        console.log(`stats were added to db`);
        console.log(result);
    });
    
    console.log(score3);
    console.log(q3Round.toFixed(2) + " seconds");

   
});

app.post("/q4", (req, res) => {
    var score4 = 0;

    if (req.body.q4Answer1 == "a"){
        score4++;
    }

    if (req.body.q4Answer2 == "c"){
        score4++;
    }

    if (req.body.q4Answer3 == "d"){
        score4++;
    }

    if (req.body.q4Answer4 == "a"){
        score4++;
    }

    if (req.body.q4Answer5 == "d"){
        score4++;
    }

    if (req.body.q4Answer6 == "d"){
        score4++;
    }

    if (req.body.q4Answer7 == "a"){
        score4++;
    }

    if (req.body.q4Answer8 == "d"){
        score4++;
    }

    if (req.body.q4Answer9 == "b"){
        score4++;
    }

    if (req.body.q4Answer10 == "c"){
        score4++;
    }

    if (req.body.wq1 == "Get a coin"){
        score4++;
    }

    if (req.body.wq2 == "Game over"){
        score4++;
    }

    if (req.body.wq3 == "Spotted"){
        score4++;
    }

    if (req.body.wq4 == "Knockout win"){
        score4++;
    }

    if (req.body.wq5 == "Scorpion's grab move"){
        score4++;
    }

    if (req.body.wq6 == "Portal gun sound"){
        score4++;
    }

    if (req.body.wq7 == "Intervention shot"){
        score4++;
    }

    if (req.body.wq8 == "You died"){
        score4++;
    }

    if (req.body.wq9 == "Creeper hiss"){
        score4++;
    }

    if (req.body.wq10 == "Wasted"){
        score4++;
    }

    q4sw.stop();
    const delta = q4sw.read();
    const q4Round = (delta / 1000);

    let qf4 = q4Round.toFixed(2) + " seconds";

    let q4data = {score: score4, time: qf4}
    let q4sql = `INSERT INTO q4Stats SET ?`;
    let q4query = db.query(q4sql, q4data, (err, result) => {
        if (err){
            throw err;
        }
        console.log(`stats were added to db`);
        console.log(result);
        
    });

    
    
    console.log(score4);
    console.log(q4Round.toFixed(2) + " seconds");
    
});

app.get("/quizOneStats", (req, res) => {
    let sql = 'SELECT * FROM q1Stats';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } 
        res.render("../views/html/quiz1_stats", {data: JSON.stringify(result)});
    }); 
});

app.get("/quizTwoStats", (req, res) => {
    let sql = 'SELECT * FROM q2Stats';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } 
        res.render("../views/html/quiz2_stats", {data: JSON.stringify(result)});
    }); 
});

app.get("/quizThreeStats", (req, res) => {
    let sql = 'SELECT * FROM q3Stats';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } 
        res.render("../views/html/quiz3_stats", {data: JSON.stringify(result)});
    }); 
});

app.get("/quizFourStats", (req, res) => {
    let sql = 'SELECT * FROM q4Stats';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } 
        res.render("../views/html/quiz4_stats", {data: JSON.stringify(result)});
    }); 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));