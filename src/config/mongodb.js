import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMongodb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongodb is connected...");
      createCounter(clientInstance.db());
      createIndex(clientInstance.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClient = () => {
  return client;
};

const getDB = () => {
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("Counters")
    .findOne({ _id: "cartItemId" });

  if (!existingCounter) {
    db.collection("Counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndex = async (db) => {
  try {
    await db.collection("Products").createIndex({ price: 1 });
    await db.collection("Products").createIndex({ name: 1, category: -1 });
    await db.collection("Products").createIndex({ desc: "text" });
  } catch (err) {
    console.log(err);
  }
};

export default getDB;
