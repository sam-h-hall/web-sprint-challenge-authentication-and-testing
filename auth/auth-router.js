const bcrypt = require("bcryptjs");
const router = require('express').Router();
const {
  add,
  findBy
} = require("./auth-model");
const generateToken = require("./token-factory");

router.post('/register', async (req, res) => {

  let {
    username,
    password
  } = req.body;

  try {

    if (username && password) {
      const hash = bcrypt.hashSync(password, 8)
      password = hash;

      const user = await add({
        username,
        password
      });
      console.log(user);
      const token = generateToken(user);
      res.status(201).json({
        data: user,
        token,
      });
    } else {

      res.status(400).json({
        message: "Please provide valid username and password"
      });
    };
  } catch (err) {

    console.log(err);
    res.status(500).json({
      user: credentials.username,
      err: {
        ...err
      },
      message: "There was a sever error fulfilling your request"
    });
  };
});

router.post('/login', (req, res) => {
  const {
    username,
    password,
  } = req.body;

  if (username && password) {
    findBy({
        username: username
      })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: "TAKE THIS TOKEN, YOU HAVE PASSED MY TEST",
            token: token
          });
        } else {
          res.status(401).json({
            message: "YOU HAVE FAILED MY TEST, YOUR CREDENTIALS ARE INVALID"
          })
        }
      }).catch(err => {
        res.status(500).json({
          err: err.message,
          message: "Server error fulfilling your request"
        })
      })
  } else {
    res.status(400).json({
      message: "C'mon, give me a username and valid password so I can at least test you :("
    })
  }
});

module.exports = router;