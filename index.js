const http = require('http');

const express = require('express');
const app = express();
const sever = http.createServer(app)

const cors = require('cors');
app.use(cors());

app.use(express.static("views"));
app.set('view engine', 'ejs');

const socketIO = require("socket.io");
const io = socketIO(sever);

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


let { DAO } = require("./models/dao.js")
let { User } = require("./models/structure/user");
const path = require('path');
const { Subject } = require('./models/structure/notes/subject.js');
const { ObjectId } = require('mongodb');

sever.listen(5001);
console.log("Sever created");
// console.log(sever);  



app.get("/signup", (req, res) => {

  res.render("signup",
    {
      backlink: req.headers.referer,
      hostname: req.get("host")
    });

  io.on('connection', socket => {
    console.log("New Signup Socket Connection")

    socket.on('username-available', username => {
      console.log("Username Available Check Event Handled")
      console.log(`Username to be Checked: ${username}`);

      DAO.usernameAvailable(username)
        .then((result) => {
          console.log(`Username Available: ${result}`)
          return result
        }
        )
        .then((state) => {
          console.log(state)
          socket.emit("userAvailabilityState", state)
        })
        .catch((e) => {
          console.error(e.message)
        })

    })
  })
})

app.post("/signup", (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;

  DAO.addUser(new User(firstname, lastname, email, phone, username, password));
  res.redirect("./")
})



app.post("/login", (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let userInstance = {}

  console.log(username);
  console.log(password);

  DAO.logIn(username, password).then((user) => {
    userInstance = user
    // console.log(userInstance)
  }).then(() => {
    if (userInstance != null) {
      console.log(`Valid login:${userInstance._id.toString()}`)
      res.redirect(`../${userInstance._id.toString()}/home`);
    }
  })
})

app.get("/home", (req, res) => {
  res.render("home", { username: "Test Value" })
})

app.get("/:userID/home", (req, res) => {
  let user = {}
  let username = "";
  let notesArray = []
  let subjectArray = []
  DAO.getUsername(req.params.userID).then((resultSet) => {
    user = resultSet;
    // console.log(user)
  }).then(() => {
    username = user.username
    DAO.getSubjects(req.params.userID).then((subjects) => (subjectArray = [...subjects]))
      .then(() => {
        res.render("home", {
          host: req.get("host"),
          username: username,
          notes: notesArray,
          subjects: subjectArray
        })
      })
  })

  io.on("connection" , socket => {
    console.log("Web socket con successfull")
  })

})

app.post("/:userID/create-subject", (req, res) => {
  DAO.addSubject(new Subject(new ObjectId(req.params.userID), req.body.subject))
    .then(() => {
      res.redirect(req.headers.referer)
    })
})

// Send home.css file on request
app.get("*/css/home.css", (req, res) => {
  res.sendFile(path.join(__dirname, "views/css/home.css"))
  // console.log(path.basename("./css/home.css"))
})

// Send home.js file on request
app.get("*/js/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "views/js/home.js"))
  // console.log(path.basename("./css/home.css"))
})

// Send the custom font style on request
app.get("*/fonts/Butterline/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "views/fonts/Butterline/style.css"))
  // "views\fonts\Butterline\style.css"
})

// Send custom font file on request
app.get("*/fonts/Butterline/Butterline.woff", (req, res) => {
  res.sendFile(path.join(__dirname, "views/fonts/Butterline/Butterline.woff"))
  // "views\fonts\Butterline\style.css"
})

// Send jQuery
app.get("*/js/jquery-3.5.1.js", (req, res) => {
  res.sendFile(path.join(__dirname, "views/js/jquery-3.5.1.js"))
  // console.log(path.basename("./css/home.css"))
})

// Send Select 2 css
app.get("*/css/select2.css", (req, res) => {
  res.sendFile(path.join(__dirname, "views/css/select2.css"))
  // console.log(path.basename("./css/home.css"))
})

// Send Select 2 js

app.get("*/js/select2.js", (req, res) => {
  res.sendFile(path.join(__dirname, "views/js/select2.js"))
  // console.log(path.basename("./css/home.css"))
})