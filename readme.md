# Backend Application

This is the backend of the application, built with Node.js and Express. It provides RESTful APIs for user authentication, product management, and image uploads using Cloudinary.

## Features

- Token-based user authentication.
- CRUD operations for products.
- Middleware for file uploads with Cloudinary integration.
- Secure API endpoints with jwt authentication.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) or **yarn** (optional)

---

## Setup Instructions

Follow these steps to set up the backend locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd <project-directory>
```

### 3. Install Dependencies
Install the required Node.js packages using:

```bash
npm install
```

Or, if you prefer yarn:

```bash
yarn install
```


### 5. Start the Application
Start the development server:

```bash
npm start
```

The backend will be accessible at http://localhost:3000.

## API Endpoints

### Authentication
POST /users/login - User login <br />
POST /users/register - User registration <br />

### Users
GET /users/ Fetch all users 

### Products
GET /products - Fetch all products <br />
POST /products - Add a new product <br />
PATCH /products/:id - Update a product <br />
DELETE /products/:id - Delete a product

## File Structure
```bash
src/
├── config/            # Configuration files (DB connection, environment setup)
├── controllers/       # Business logic for handling requests
├── middleware/        # Middleware for authentication and file uploads
├── models/            # Mongoose models for MongoDB
├── routes/            # API route definitions
├── utils/             # Utility functions
├── server.js          # Application entry point
```

## Troubleshooting

### Common Issues

1. Failed to connect to MongoDB
 - Verify the MONGO_URI in the .env file.
 - Ensure MongoDB is running locally or the cloud instance is accessible.

2. Invalid JWT token
 - Check the JWT_SECRET in the .env file.
 - Ensure the token is being sent in the Authorization header.

3. File upload errors
 - Verify the Cloudinary credentials in the .env file.
 - Ensure your Cloudinary account has sufficient storage.
 

## License
This project is licensed under the MIT License.

## Author
Anuka Fonseka <br/>
[GitHub Profile](https://github.com/AnukaFonseka)
