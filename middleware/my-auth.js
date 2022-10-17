const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
if (req.get("Authorization")) {

    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;

    decodedToken = jwt.verify(token, "secretword");

    if (!decodedToken) {
        const error = new Error("You are not authenticated");
        error.statusCode = 401;
        throw error;
    }
//req.userId = decodedToken.userId;
    
next();


} else {
    const error = new Error ("You are forbidden from visiting this page");
    error.statusCode = 401;
    next(error);
}



};