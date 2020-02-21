const jwt = require("jsonwebtoken");
const SECRET_KEY = "process.env.SECRET_JWT";
const verifyToken = jwtToken => {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log("e:", e);
    return false;
  }
};

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    /* Remove Bearer from string */
    token = token.slice(7, token.length);
  }
  if (!token) {
    return res.status(401).json({
      data: {
        success: false,
        message: "Token doesnt exist"
      }
    });
  }
  let userData = verifyToken(token);
  if (userData.exp <= Date.now()) {
    res.end('Access token has expired', 400);
  }
  if (userData) {
    req.userData = {
      user: userData,
      token: token
    };
    next();
  } else {
    return res.status(401).json({
      data: {
        success: false,
        message: "Token is wrong"
      }
    });
  }
};
