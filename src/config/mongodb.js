import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMongodb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance.db();
      console.log("Mongodb is connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
  return client;
};

export default getDB;
