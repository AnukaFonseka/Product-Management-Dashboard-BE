const {getProductsCollection} = require("../config/db.config");
const { ObjectId } = require("mongodb");

//Create New Product
async function createProduct({
    productName,
    productDescription,
    productCategory,
    productPrice,
    productImage
}) {
    try {
        const productsCollection = getProductsCollection();

        const newProduct = {
            productName,
            productDescription,
            productCategory,
            productPrice,
            productImage
        };

        await productsCollection.insertOne(newProduct);
    } catch (error) {
        console.log("Error Creating New Product Service", error)
        throw error
    }
    
}

// Get All Products with optional filtering by category
async function getAllProducts(productCategory) {
    try {
        const productsCollection = getProductsCollection();

        const query = {};

        if (productCategory) {
            query.productCategory = productCategory;
        }

        const products = await productsCollection.find(query).toArray();

        return products;
    } catch (error) {
        console.error("Error Fetching Products Service", error);
        throw error;
    }
}

// Get Product By ID
async function getProductById(id) {
    try {
        const productsCollection = getProductsCollection();

        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const product = await productsCollection.findOne({ _id: new ObjectId(id) });

        return product;
    } catch (error) {
        console.error("Error Fetching Product By ID Service", error);
        throw error;
    }
}

// Update Product By ID
async function updateProduct(id, updateData) {
    try {
        const productsCollection = getProductsCollection();

        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await productsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        return result.matchedCount > 0;
    } catch (error) {
        console.error("Error Updating Product Service", error);
        throw error;
    }
}

// Delete Product By ID
async function deleteProduct(id) {
    try {
        const productsCollection = getProductsCollection();

        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });

        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error Deleting Product Service", error);
        throw error;
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };