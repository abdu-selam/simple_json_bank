# Simple JSON Bank

A lightweight banking REST API built with Node.js and Express.

The project provides user authentication, bank accounts, money transfers, transaction history, and JSON file-based data persistence. It is designed as a simple backend project for learning and experimenting with REST APIs, authentication, middleware, and server-side data management.

## Features

* User registration and login
* HTTP-only cookie authentication
* Automatic account generation
* Account balance management
* Money transfers between accounts
* Transfer confirmation codes
* Transaction history
* Protected API routes
* CORS support
* JSON file-based data storage
* Environment variable configuration

## Tech Stack

* Node.js
* Express
* JavaScript
* Cookie Parser
* CORS
* dotenv
* JSON

## Project Structure

```text
server/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
├── db/
├── server.js
└── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/simple-json-bank.git
cd simple-json-bank/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
NODE_ENV=development
CLIENT=http://localhost:3000
```

Adjust `CLIENT` to match the URL of your frontend.

### 4. Start the development server

```bash
npm run dev
```

Or run the server normally:

```bash
npm start
```

The API will be available at:

```text
http://localhost:5000
```

## API

### User

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/user/register` | Create a new user    |
| POST   | `/user/login`    | Log in a user        |
| DELETE | `/user/logout`   | Log out              |
| GET    | `/user/me`       | Get the current user |

### Banking

| Method | Endpoint        | Description                     |
| ------ | --------------- | ------------------------------- |
| POST   | `/bank/account` | Prepare a transfer              |
| POST   | `/bank/send`    | Confirm and complete a transfer |
| GET    | `/bank/history` | Get transaction history         |

Banking routes require authentication.

## Data Storage

The project uses local JSON files instead of a database.

```text
db/
├── users.json
├── accounts.json
└── waits.json
```

This keeps the project simple and makes it easy to run without installing or configuring a database.

For a production application, the JSON storage layer should be replaced with a proper database such as PostgreSQL or MongoDB.

## Authentication

Authentication uses a token stored in an HTTP-only cookie.

Protected routes validate the cookie before allowing access to account and transaction operations.

## Transfer Flow

A transfer is handled in two steps:

```text
Prepare transfer
      ↓
Validate account and balance
      ↓
Create temporary transfer
      ↓
Confirm with code
      ↓
Transfer money
      ↓
Create transaction records
```

Transfers also maintain a minimum account balance requirement.

## Notes

This project is intended for learning and demonstration purposes. It is not designed for handling real financial transactions or sensitive banking data.

Passwords are currently stored directly in the JSON data layer and should be securely hashed before using this architecture in a real application.

## License

MIT
