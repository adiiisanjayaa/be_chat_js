import * as jwt from "jsonwebtoken";
import config from "../config/config";
import Helper from "../utilities/helpers";

export const checkJwt = (req, res, next) => {
  //Get the jwt token from the head
  const token = req.headers.authorization;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json(Helper.errorResponse(401, "Unauthorized!"));
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};

module.exports = {
  checkJwt,
};
