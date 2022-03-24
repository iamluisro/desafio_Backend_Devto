const jwt = require("../lib/jwt");

function auth(request, response, next) {
  try {
    const { authorization: token } = request.headers;
    console.log("token: ", token);

    const isValidToken = jwt.verify(token);
    console.log("isvalidToken", isValidToken);

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
