# Book Management

## Introduction
This project is a simple book management system that allows users to add, update, delete, and view books in a library.

## Prerequisites
- Node.js
- npm (Node package manager)

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/assignment.git
  ```
2. Navigate to the project directory:
  ```bash
  cd assignment
  ```
3. Install the required dependencies:
  ### if macOS:
  Check out this [link](https://www.postgresql.org/download/macosx/) to install PostgreSQL on macOS.
  ### if Ubuntu:
  ```bash
  sudo apt install postgresql
  npm install
  ```

## Usage
1. Create .env file:
  ```bash
  touch .env
  ```
2. Add the following environment variables to the .env file:
  ```bash
  DATABASE_URL="postgresql://bookuser:bookpass@localhost:5432/bookdb?schema=public"
  ```
3. Create a new database:
  ```bash
  sudo -u postgres psql
  # Inside psql, create a new user and database
  CREATE USER bookuser WITH PASSWORD 'bookpass';
  CREATE DATABASE bookdb;
  GRANT ALL PRIVILEGES ON DATABASE bookdb TO bookuser;
  ```
4. Run the database migrations:
  ```bash
  npx prisma generate
  npx prisma db push
  ```
  
5. Run the application:
  ### development:
  ```bash
  npm run dev
  ```
  ### production:
  ```bash
  npm run build
  npm run start
  ```
6. Open your browser and navigate to `http://localhost:3000`.

## Features
- Add new books
- Update existing books
- Delete books
- View all books
