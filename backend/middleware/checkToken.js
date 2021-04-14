const jwt = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("Токен байхгүй байна");
    }

    const tokenObj = jwt.verify(token, process.env.TOKEN_KEY);

    if (!tokenObj) {
      throw new Error("Токен алдаатай байна");
    }

    req.userId = tokenObj.id;
    req.role = tokenObj.role;

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: error.message,
    });
  }
};
