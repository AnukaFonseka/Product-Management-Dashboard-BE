const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:THAmkVDM1q0ACouZ@cluster0.pjopr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let dbClient;
let usersCollection;
let productsCollection;

async function connectToDatabase() {
  try {
    dbClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
    });

    await dbClient.connect();
    const productdb = dbClient.db("ProductInventory");
    usersCollection = productdb.collection("users");
    productsCollection = productdb.collection("products");

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function getUsersCollection() {
  return usersCollection;
}

function getProductsCollection() { 
  return productsCollection;
}

module.exports = { connectToDatabase, getUsersCollection, getProductsCollection };