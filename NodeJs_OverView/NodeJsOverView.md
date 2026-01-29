# 🌟 Node.js  : The Complete Nodes

## 🎯 What this file contains

* A complete, beginner-friendly Node.js course in **one** Markdown file
* Hands-on examples you can run locally

---

## 🧭 Table of Contents

1. [Why Node.js?](#-why-nodejs)
2. [Prerequisites](#-prerequisites)
3. [Setup — Install Node & npm](#-setup--install-node--npm)
4. [Project Starter (single-file)](#-project-starter-single-file)
5. [Core Concepts & Examples](#-core-concepts--examples)

   * Modules
   * fs (File System)
   * HTTP server
   * Express
   * Middleware
   * JSON & REST APIs
6. [Asynchronous Patterns](#-asynchronous-patterns)

   * Callbacks
   * Promises
   * Async/Await
7. [Event Loop (Simple Explanation)](#-event-loop-simple-explanation)
8. [Persisting Data — JSON file as DB](#-persisting-data--json-file-as-db)
9. [Environment Variables & .env](#-environment-variables--env)
10. [Debugging & Nodemon](#-debugging--nodemon)
11. [Testing (light intro)](#-testing-light-intro)
12. [Deployment & Next Steps](#-deployment--next-steps)
13. [Cheat Sheet & Commands](#-cheat-sheet--commands)

---

## 🧾 Why Node.js?

* Use JavaScript both in the browser and on the server.
* Fast runtime with non-blocking I/O — ideal for I/O-heavy apps.
* Huge ecosystem via `npm` — build quickly with community packages.

---

## ✅ Prerequisites

* Basic JavaScript knowledge (variables, functions, arrays, objects)
* Terminal/command-line basics
* A code editor (VS Code recommended)

---

## 🛠️ Setup — Install Node & npm

1. Go to: [https://nodejs.org](https://nodejs.org) and install the **LTS** version.
2. Verify installation in terminal:

```bash
node -v
npm -v
```

Expected output: two version numbers.

---

## 📁 Project Starter (single-file)

Create a folder `node-students` and inside it create `README.md` (this file) and `app.js`.

`app.js` is where we'll try small examples; but your repo's `README.md` will be the big single file students read.

Create `app.js` with:

```js
// app.js
console.log('Hello, Node.js students!');
```

Run:

```bash
node app.js
```

---

## 🧩 Core Concepts & Examples

### 1) Modules (CommonJS)

Node uses CommonJS by default (unless you choose ESM). Use `require` and `module.exports`.

```js
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

### 2) fs — File System (synchronous & asynchronous)

```js
const fs = require('fs');

// sync
fs.writeFileSync('data.txt', 'Hello students');
console.log(fs.readFileSync('data.txt', 'utf8'));

// async
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log('async read ->', data);
})
```

### 3) Create a tiny HTTP server (no frameworks)

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to raw Node.js server');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('Server on http://localhost:3000'));
```

### 4) Express — faster routing & middleware

```js
// index.js
const express = require('express');
const app = express();
app.use(express.json()); // parse JSON bodies

app.get('/', (req, res) => res.send('Hello from Express'));

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(3000, () => console.log('Express on http://localhost:3000'));
```

Install express:

```bash
npm init -y
npm install express
```

---

## 🔁 Asynchronous Patterns

### Callback example

```js
const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### Promises

```js
const fsPromises = require('fs').promises;
fsPromises.readFile('data.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await (recommended for readability)

```js
(async function() {
  try {
    const data = await require('fs').promises.readFile('data.txt', 'utf8');
    console.log('await ->', data);
  } catch (err) {
    console.error(err);
  }
})();
```

---

## 🔄 Event Loop — simple explanation

Show this code to explain the order:

```js
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
```

Expected output:

```
start
end
promise
timeout
```

Explain microtasks (Promises) vs macrotasks (setTimeout) in simple words.

---

## 💾 Persisting Data — Use JSON file as a tiny DB

A practical single-file example: a small REST API that stores notes in `db.json`.

```js
// notes-api.js
const fs = require('fs').promises;
const express = require('express');
const app = express();
app.use(express.json());

const DB = './db.json';

async function readDB() {
  try {
    const content = await fs.readFile(DB, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeDB(data) {
  await fs.writeFile(DB, JSON.stringify(data, null, 2));
}

app.get('/notes', async (req, res) => {
  const notes = await readDB();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const notes = await readDB();
  const note = { id: Date.now(), ...req.body };
  notes.push(note);
  await writeDB(notes);
  res.status(201).json(note);
});

app.listen(3000, () => console.log('Notes API on http://localhost:3000'));
```

**Warning:** Using a JSON file as DB is fine for learning and small demos not for production. Discuss concurrency and race conditions.

---

## 🔐 Environment Variables & .env

Install dotenv:

```bash
npm install dotenv
```

Create `.env`:

```
PORT=3000
SECRET=mySecretKey
```

Use in code:

```js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

**Tip:** never commit `.env` to git. Add it to `.gitignore`.

---

## 🐞 Debugging & Nodemon

Install nodemon globally or as dev dependency:

```bash
npm install -g nodemon
# or
npm install --save-dev nodemon
```

Run with:

```bash
nodemon index.js
```

Debugging in VS Code: set a launch configuration to run `node` on your entry file. Step through breakpoints.

---

## 🧪 Testing (light intro)

Use `jest` for unit testing simple functions.

Install:

```bash
npm install --save-dev jest
```

Add to `package.json`:

```json
"scripts": { "test": "jest" }
```

Simple test example:

```js
// sum.js
function sum(a, b) { return a + b; }
module.exports = sum;

// sum.test.js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3);
});
```

Run:

```bash
npm test
```

---

## 🚀 Deployment & Next Steps

* Deploy small apps on **Render**, **Railway**, **Vercel** (for serverless), or **Heroku** alternatives.
* Learn databases: **MongoDB** (with Mongoose) or **Postgres**.
* Authentication: **JWT**, **OAuth**.
* Build a real full-stack project (MERN stack).

---

## 🧾 Cheat Sheet & Useful Commands

```bash
# init project
npm init -y

# install packages
npm install express dotenv

# dev dependencies
npm install --save-dev nodemon jest

# run
node index.js
nodemon index.js

# test
npm test
```

