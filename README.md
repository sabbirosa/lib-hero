# LibHero - Library Management API

A Library Management System built with Express, TypeScript, and MongoDB.

## Features

- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Borrow books with automatic inventory management
- **Validation**: Request validation middleware for all endpoints
- **Aggregation**: MongoDB aggregation pipeline for borrowed books summary
- **Error Handling**: Comprehensive error handling middleware
- **Filtering & Sorting**: Advanced querying capabilities

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Custom validation middleware
- **Architecture**: Clean MVC pattern

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sabbirosa/lib-hero.git
cd lib-hero
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lib-hero
```

4. Build the project:

```bash
npm run build
```

5. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Books

#### Create Book

- **POST** `/api/books`
- **Body**:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### Get All Books

- **GET** `/api/books`
- **Query Parameters**:
  - `filter`: Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
  - `sort`: Sort order (asc, desc)
  - `sortBy`: Field to sort by (default: createdAt)
  - `limit`: Number of results (default: 10)

Example: `/api/books?filter=SCIENCE&sort=desc&limit=5`

#### Get Book by ID

- **GET** `/api/books/:bookId`

#### Update Book

- **PUT** `/api/books/:bookId`
- **Body**: Any book fields to update

#### Delete Book

- **DELETE** `/api/books/:bookId`

### Borrowing

#### Borrow Book

- **POST** `/api/borrow`
- **Body**:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Get Borrowed Books Summary

- **GET** `/api/borrow`
- Returns aggregated summary of all borrowed books

## Business Logic

### Book Availability

- Books automatically update `available` status based on `copies` count
- Pre-save middleware ensures availability is always accurate
- Static and instance methods for availability management

### Borrowing Process

1. Validates book exists and has sufficient copies
2. Creates borrow record
3. Deducts quantity from book inventory
4. Updates book availability if copies reach zero

### Validation

- All requests validated using custom middleware
- Proper error responses with detailed validation messages
- Genre validation against predefined enum values
- Numeric validations for copies and quantities

## Data Models

### Book Schema

```typescript
{
  title: string (required)
  author: string (required)
  genre: enum (required) // FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
  isbn: string (required, unique)
  description?: string
  copies: number (required, min: 0)
  available: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Borrow Schema

```typescript
{
  book: ObjectId (required, ref: Book)
  quantity: number (required, min: 1)
  dueDate: Date (required, future date)
  createdAt: Date
  updatedAt: Date
}
```

## Error Handling

The API includes comprehensive error handling for:

- Validation errors
- Resource not found (404)
- Duplicate key violations
- Database connection issues
- Invalid ObjectId formats

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests (to be implemented)

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lib-hero
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
