import * as jwt from "jsonwebtoken";
import config from "../config/config";
import Helper from "../utilities/helpers";

export const verifyUser = (req, res, next) => {
  //Get the jwt token from the head
  const token = req.headers.authorization;
  let jwtPayload;
  const { username } = req.params;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    console.log(username);
    console.log(jwtPayload.username);
    if (jwtPayload.username !== username) {
      res.status(403).json(Helper.errorResponse(401, "Forbidden!"));
      return;
    }
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json(Helper.errorResponse(401, "Unauthorized!"));
    return;
  }

  //Call the next middleware or controller
  next();
};

module.exports = verifyUser;
