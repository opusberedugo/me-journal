
const { MongoClient, ObjectId } = require("mongodb");


const client = new MongoClient("mongodb://localhost:27017");

class DAO {

  /**
   * 
   * This methods add a user to the database by adding a user object to the mongodb database 
   * @param {User} user
   * @returns insertedId
   */
  static addUser = async (user) => {
    try {

      client.connect();

      let database = client.db("mejournal");

      let collection = database.collection("users");

      let result = await collection.insertOne(user);

      console.log("Insertion Complete")
      console.log(`ID: ${result.insertedId}`)
      return result.insertedId

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
  }

  /**
   * This method checks the database for a 
   * @param {string} usernm 
   * @param {string} passw 
   * @returns user
   */
  static logIn = async (usernm, passw) => {

    try {
      client.connect()

      let database = client.db("mejournal");

      let collction = database.collection("users")

      let user = await collction.findOne({ username: usernm, password: passw })

      await client.close()
      return user;

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }

  /**
   * 
   * @param {string} userID 
   * @returns user
   */
  static getUsername = async (userID) => {

    try {
      client.connect()

      let database = client.db("mejournal");

      let collction = database.collection("users")

      let user = await collction.findOne({ _id: ObjectId(`${userID}`) })

      await client.close()
      return user;

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }

 /**
  * @param {string} userID
  */
  static getSubjects = async (userID) => {

    try {
      client.connect()

      let database = client.db("mejournal");

      let collction = database.collection("subjects")

      let subjects = collction.find({ ownerID: new ObjectId(userID) })
      let subjectArray = [];


      while (await subjects.hasNext()) {
        const subject = await subjects.next();
        // console.log(`id" ${subject._id}`)
        // console.log(`owner" ${subject.ownerID}`)
        // console.log(`Subject" ${subject.subject}`)
        subjectArray[subjectArray.length] = subject
      }

      await client.close()
      return subjectArray;

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }

  /**
   * 
   */
  static addSubject = async (subject) => {
    const client = new MongoClient("mongodb://localhost:27017");

    try {
      await client.connect();

      let database = client.db("mejournal");

      let collection = database.collection("subjects");

      let result = await collection.insertOne(subject);
      // console.log(result)

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }




  static addSubscriber = async (email) => {
    const client = new MongoClient("mongodb://localhost:27017");

    try {
      await client.connect();

      let database = client.db("mejournal");

      let collection = database.collection("subscribers");

      let result = await collection.insertOne(email);

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }

  static sendMessage = async (message) => {
    const client = new MongoClient("mongodb://localhost:27017");

    try {
      await client.connect();

      let database = client.db("mejournal");

      let collection = database.collection("feedback");

      let result = await collection.insertOne(message);

    } catch (err) {
      console.error("Something went wrong");
      console.warn(err.message)
    }
    await client.close();
  }

  static usernameAvailable = async (usernm) => {
    const client = new MongoClient('mongodb://localhost:27017');

    try {
      await client.connect();

      const database = client.db("mejournal");

      const collection = database.collection('users');

      const user = await collection.findOne({ username: usernm });

      if (user == null) {
        await client.close();
        return true;
      } else if (user != null) {
        await client.close();
        return false;
      }

    } catch (err) {
      console.log(err.stack);
    }

    await client.close();
  }
}




// DAO.usernameAvailable("jStones").then((result) => (console.log(result))).catch((e) => (console.log(e.message)) );


// const phoneAvailable = async () => { }

module.exports.DAO = DAO;