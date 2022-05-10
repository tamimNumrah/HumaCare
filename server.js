var express = require("express");
const router = express.Router();
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash"); //for flash message
const passport = require('passport');
require("./config/passport")(passport)

let dbConnect = require("./dbConnect");

var app = express();

//app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/patients", require("./routes/patients"));
app.use("/doctors", require("./routes/doctors"));
app.use("/receptionist", require("./routes/receptionist"));
app.use("/clinic", require("./routes/clinic"));


var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App running at http://localhost:" + port);
});
