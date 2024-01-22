import jwt from "jsonwebtoken";

export const jwtAuthorizer = (req, res, next) => {
  //read token
  const token = req.headers["authorization"];
  //if no token return error
  if (!token) {
    return res.status(400).send("unauthorized");
  }

  //check if token is valid
  try {
    const payload = jwt.verify(token, "YmJW3Ix4z0xr7a9Omg3kWJ6x96d0y0Kj");
    req.userId = payload.userid;
  } catch (err) {
    // if any error while verification return it
    return res.status(400).send("unauthorized");
  }

  //call next middleware
  next();
};
