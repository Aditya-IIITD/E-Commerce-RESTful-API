import { ObjectId } from "mongodb";
import getDB from "../../config/mongodb.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";

class ProductRepository {
  constructor() {
    this.collection = "Products";
  }
  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = { $lte: parseFloat(maxPrice) };
      }
      if (category) {
        filterExpression.category = category;
      }

      const products = await collection.find(filterExpression).toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rate(userID, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );
      const rated = await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: {
            ratings: { userID: new ObjectId(userID), rating: rating },
          },
        }
      );
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async averagePricePerCategory() {
    try {
      const db = getDB();
      const result = await db
        .collection(this.collection)
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with DB", 500);
    }
  }
}

export default ProductRepository;

//Approach 2
// import { ObjectId } from "mongodb";
// import getDB from "../../config/mongodb.js";
// import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";

// class ProductRepository {
//   constructor() {
//     this.collection = "Products";
//   }
//   async add(newProduct) {
//     try {
//       const db = getDB();
//       const collection = db.collection(this.collection);
//       await collection.insertOne(newProduct);
//       return newProduct;
//     } catch (err) {
//       throw new ApplicationError("Something went wrong", 500);
//     }
//   }

//   async getAll() {
//     try {
//       const db = getDB();
//       const collection = db.collection(this.collection);
//       const products = await collection.find().toArray();
//       console.log(products);
//       return products;
//     } catch (err) {
//       throw new ApplicationError("Something went wrong", 500);
//     }
//   }

//   async get(id) {
//     try {
//       const db = getDB();
//       const collection = db.collection(this.collection);
//       return collection.findOne({ _id: new ObjectId(id) });
//     } catch (err) {
//       throw new ApplicationError("Something went wrong", 500);
//     }
//   }

//   async filter(minPrice, maxPrice, category) {
//     try {
//       const db = getDB();
//       const collection = db.collection(this.collection);
//       let filterExpression = {};
//       if (minPrice) {
//         filterExpression.price = { $gte: parseFloat(minPrice) };
//       }
//       if (maxPrice) {
//         filterExpression.price = { $lte: parseFloat(maxPrice) };
//       }
//       if (category) {
//         filterExpression.category = category;
//       }

//       const products = await collection.find(filterExpression).toArray();
//       return products;
//     } catch (err) {
//       throw new ApplicationError("Something went wrong", 500);
//     }
//   }

//   async rate(userID, productId, rating) {
//     try {
//       const db = getDB();
//       const collection = db.collection(this.collection);
//       const product = await collection.findOne({
//         _id: new ObjectId(productId),
//       });
//       const userRating = product.ratings?.find((r) => r.userID == userID);
//       if (userRating) {
//         await collection.updateOne(
//           {
//             _id: new ObjectId(productId),
//             "ratings.userID": new ObjectId(userID),
//           },
//           {
//             $set: {
//               "ratings.$.rating": rating,
//             },
//           }
//         );
//       } else {
//         const rated = await collection.updateOne(
//           {
//             _id: new ObjectId(productId),
//           },
//           {
//             $push: {
//               ratings: { userID: new ObjectId(userID), rating: rating },
//             },
//           }
//         );
//       }
//     } catch (err) {
//       throw new ApplicationError("Something went wrong", 500);
//     }
//   }
// }

// export default ProductRepository;
