const { validationResult } = require("express-validator");
const productService = require("../services/product.service");

//Create new product
async function createProduct(req, res) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({error: true, message: errors.array()});
        }

        const {productName, productCategory, productPrice} = req.body;
        const productImage = req.file?.path;

        await productService.createProduct({
            productName,
            productCategory,
            productPrice,
            productImage
        });
        
        return (
            res.status(201).json({ error: false, message: "Product added successfully"})
        )
    } catch (error) {
        console.error("Error creating product controller", error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

// Get all products with optional filtering by category
async function getAllProducts(req, res) {
    try {
        const { category } = req.query;
        const products = await productService.getAllProducts(category);

        return res.status(200).json({ error: false, payload: products });
    } catch (error) {
        console.error("Error fetching products controller", error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

// Get product by ID
async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);


        if (!product) {
            return res.status(404).json({ error: true, message: "Product not found" });
        }

        return res.status(200).json({ error: false, payload: product });
    } catch (error) {
        console.error("Error fetching product by ID controller", error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

// Update product by ID
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { productName, productCategory, productPrice } = req.body;
        const productImage = req.file?.path;

        console.log(productName);

        const updatedProduct = await productService.updateProduct(id, {
            productName,
            productCategory,
            productPrice,
            productImage
        });

        console.log(updatedProduct);

        if (!updatedProduct) {
            return res.status(404).json({ error: true, message: "Product not found" });
        }

        return res.status(200).json({ error: false, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product controller", error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

// Delete product by ID
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const deleted = await productService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({ error: true, message: "Product not found" });
        }

        return res.status(200).json({ error: false, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product controller", error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };