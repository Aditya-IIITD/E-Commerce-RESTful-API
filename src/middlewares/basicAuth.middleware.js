import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("No authentication detials found");
  }

  const base64credentials = authHeader.replace("Basic ", "");
  const decodedCreds = Buffer.from(base64credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds);
  const creds = decodedCreds.split(":");
  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );

  if (user) {
    return next();
  } else {
    return res.status(401).send("invalid credentials");
  }
};

export default basicAuthorizer;
