class User {
  firstname
  lastname
  email
  phone
  username
  password
  emailVerficationStatus
  phoneVerficationStatus
  emailVerficationDate
  phoneVerficationDate
  accountCreationDate

  constructor(firstname, lastname, email, phone, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;

    this.emailVerficationStatus = "unverified"
    this.emailVerficationDate = null;
    
    this.phoneVerficationStatus = "unverified"
    this.phoneVerficationDate = null;
    this.accountCreationDate = Date(Date.now())
  }
}

module.exports.User = User;