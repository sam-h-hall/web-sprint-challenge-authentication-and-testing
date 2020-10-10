const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const payload = {
    username: user.username,
    password: user.password,
  };

  const secret = process.env.JWT_SECRET || "Kris smells";

  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secret, options);

  return token;

};