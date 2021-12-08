const express = require("express");
const ejs = require("ejs");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/quizInfo", (req, res) => {
    res.render("../views/html/quizzes_page");
});

app.get("/login", (req, res) => {
    res.render("../views/html/login_page");
});

app.get("/signup", (req, res) => {
    res.render("../views/html/signup_page");
});

app.get("/quiz1", (req, res) => {
    res.render("../views/html/quiz1");
});

app.get("/quiz2", (req, res) => {
    res.render("../views/html/quiz2");
});

app.get("/quiz3", (req, res) => {
    res.render("../views/html/quiz3");
});

app.get("/quiz4", (req, res) => {
    res.render("../views/html/quiz4");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));