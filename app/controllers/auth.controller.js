const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dbUsers = db.dbUsers;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    dbUsers.findOne({ email: req.body.email })
      .then(data => {
        if (!data) {
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // spara lösenord i databasen.
            // Create a user
            const user = new dbUsers({
              email: req.body.email,
              password: hash,
            });
          
            // Save user in the database
            user
              .save(user)
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the user."
                });
              });
          });
        } else  {
          res.send({message: `User with email ${req.body.email} already exists!`})
        }
      })
};

// Find a single login with an email
exports.login = (req, res) => {
  const e = req.body.email;

  dbUsers.findOne({ email: e })
    .then(data => {
      if (!data)
        res.send({ message: "Email or password incorrect"});
      else {
        bcrypt.compare(req.body.password, data.password, function(err, result) {
          if (err) {
            // handle error
            res.status(404).json({fel: "fel"});
          }
          if (result) {
            // Send JWT
            const token = jwt.sign(
              { user_id: data._id, e },
              "reallylongandhardcombinationofwordstomakeithard",
              {
                expiresIn: "2h",
              }
            );

            console.log("token: ", token);

            // save user token
            //data.token = token;
            
            // user
            res.status(200).json({accessToken: token});
            //res.send({success: true, message: 'passwords match!'});
          } else {
            // response is OutgoingMessage object that server response http request
            res.send({success: false, message: "Email or password incorrect"});
          }
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: " 2 Error retrieving TextEditor with email=" + e });
    });
};