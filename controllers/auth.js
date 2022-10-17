const User = require("../models/user");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  //const errors = validationResult(req);
  let loadedUser;

  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed");
  //   error.statusCode = 422;
  //   throw error;
  // }

  const email = req.body.email;
  const password = req.body.password; 
  const name = req.body.name;


  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
         
      
      });
      loadedUser = user;
      return user.save();
    })
    .then((data) => {
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "secretword",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "User created successfully",
        user: data._id,
        token,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.signIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

   User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email address not Found Please Register");
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      console.log(user)
      return bcrypt.compare(password, user.password);
    })
    .then((isPasswordEqual) => {
      if (!isPasswordEqual) {
        const error = new Error("Your Password is Incorrect");
        error.statusCode = 422;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "secretword",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        status: loadedUser.status,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

User.find({}).then((data) => console.log(data)); 
