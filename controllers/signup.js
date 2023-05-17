const { User } = require("../database.js");
const sendMail = require("./sendMail.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signup = async (req, res, next) => {
  const enteredUsername = req.body.username;
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  let userByUsername = await User.findOne({ username: enteredUsername });
  let userByEmail = await User.findOne({ email: enteredEmail });

  try {
    if (enteredUsername && enteredEmail && enteredPassword) {
      if (userByUsername) {
        req.session.message = "Username already registered";
        return next();
      } else if (userByEmail) {
        req.session.message = "Email already registered";
        return next();
      } else {
        bcrypt.hash(enteredPassword, saltRounds, function (err, hash) {
          if (!err) {
            User.insertMany(
              {
                email: enteredEmail,
                username: enteredUsername,
                password: hash,
              },
              { new: true }
            ).then((user) => {
              console.log("inside then");
              console.log("user: ", user);

              const subject = "Welcome Onboard Kharidiye";
              const html = `<p>Hello ${user[0].username}, your registration was successful.</p>`;

              sendMail(user[0].username, user[0].email, subject, html);

              req.session.message = "Signup Successful";
              return next();
            });

            // res.status(200).send({ success: true, message: "Signup Successful" });
          } else {
            res
              .status(400)
              .send({ success: false, message: "something went wrong" });
          }
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Inside Catch, Something went wrong" });
  }
};

module.exports = signup;
