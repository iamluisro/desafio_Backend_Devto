const jwt = require("../lib/jwt");

function auth(request, response, next) {
  try {
    const { authorization: token } = request.headers;

    const isValidToken = jwt.verify(token);

    if (!isValidToken) throw new Error("Not authorized D:");
    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      message: "Not Authorized",
      error: error.message,
    });
  }
}

module.exports = auth;
