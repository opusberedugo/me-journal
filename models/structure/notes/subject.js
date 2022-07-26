class Subject {

  ownerID;
  subject;

  constructor(ownerID, subject) {
    this.ownerID = ownerID;
    this.subject = subject
  }
}

module.exports.Subject = Subject