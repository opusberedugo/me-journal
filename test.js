const { ObjectId } = require("mongodb")
let { DAO } = require("./models/dao.js")
const { Subject } = require("./models/structure/notes/subject.js")
let user = {}
let userID = {}

// DAO.usernameAvailable("Hope").then((result) => (console.log(result)))

DAO.logIn("Opuaye", "developer").then((result) => {
  user = result
  userID = user._id
  console.log(user._id.toString())
})


// DAO.addSubject(new Subject(new ObjectId('62c8df6e1ab717a90e506b4e'), "Test"))
// DAO.getSubjects('62c8df6e1ab717a90e506b4e').then((subjects) => {
//   subjects.forEach((v) => (console.log(v)))
// })

