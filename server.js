var dotenv = require('dotenv');
dotenv.load();
var port = process.env.PORT || 8080;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,    // forces the session to be saved back to the store
    saveUninitialized: false  // dont save unmodified
}));
app.use(flash());

// routes
app.get("/", function(req, res){
  res.sendFile("/index.html");
});

app.post("/contact", function(req, res, next) {
  var data = req.body;
  var mailOptions = {
    from: data.email,
    to: process.env.EMAIL,
    subject: data.name + " from " + data.email,
    text: data.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    // Email not sent
    if(error) {
      // Log message that there was an error sending email
      console.log(error);
      // show flash message that email was not sent
      req.flash("info", "There was an error sending your email: " + error)
    } else {
      // Log message that email sent
        console.log("Message %s sent: %s", info.messageId, info.response);
      // show flash message that email was sent
        req.flash("info", "Your email was successfully sent!");

    }
  });
  res.redirect(req.baseUrl + '/');
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
