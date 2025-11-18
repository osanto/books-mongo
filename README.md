# Books MongoDB REST API

This is a simple RESTful API for managing a book collection built with Node.js, Express, and MongoDB. The API provides full CRUD operations with input validation, error handling, and pagination support.

## Features

• Create, read, update, and delete books  
• MongoDB database integration with native driver  
• Input validation and sanitization for security  
• Pagination support for book listings  
• ObjectId validation for database operations  
• Environment variable support for sensitive data  
• Proper error handling and HTTP status codes  
• Production-ready enhancements  

## Getting Started

### Prerequisites

• [Node.js](https://nodejs.org/) (v14 or higher)  
• [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/osanto/books-mongo.git
   cd books-mongo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template and fill in the required values:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file:
   ```env
   PORT=3000
   MONGO_USER=yourUser
   MONGO_PASSWORD=yourPassword
   MONGO_HOST=your-cluster.mongodb.net
   MONGO_DB_NAME=booksdb
   MONGO_APP_NAME=books-mongo-app
   ```

4. Start the application:
   ```bash
   # For development (with auto-reload)
   npm run dev
   
   # For production
   npm start
   ```

### Usage

• API endpoints available at `http://localhost:3000`  
• Use tools like Postman or curl to interact with the API  
• Supports full CRUD operations for book management  

## API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/books` | Get all books with pagination | `p` - page number (default: 0) |
| GET | `/books/:id` | Get a specific book by ID | - |
| POST | `/books` | Create a new book | - |
| PATCH | `/books/:id` | Update a book by ID | - |
| DELETE | `/books/:id` | Delete a book by ID | - |

## Book Data Model

```json
{
  "title": "string (required, max 200 chars)",
  "author": "string (required, max 100 chars)",
  "description": "string (optional, max 1000 chars)",
  "pages": "integer (optional, 1-10000)",
  "rating": "number (optional, 0-10)"
}
```

## Project Structure

```
books-mongo/
├── app.js              # Main application file with routes
├── db.js               # Database connection module
├── package.json        # Project dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Reference

This project was based bon the MongoDB tutorial content from [The Net Ninja](https://www.youtube.com/c/TheNetNinja) YouTube channel. 


## License

MIT