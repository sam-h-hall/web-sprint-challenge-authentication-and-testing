const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Kris smells";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            err: err.message,
            you: "shall not pass!"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      })
    } else {
      res.status(401).json({
        you: "shall not pass!"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
      message: "Server error fulfilling your request"
    })
  }
};