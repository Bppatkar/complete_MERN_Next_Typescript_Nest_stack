# Database & ORM Comparison Guide 🏪
*MongoDB (Mongoose) vs PostgreSQL (Prisma)*

> **Bhaiya's Note:** "Arey tension mat le! Ek story se samajhata hoon. Tu bas sun. Maano humlog ek dukaan khol rahe hain - 'Bhai-Behen Ka SuperShop'."

## 📊 Part 1: Database Ki Dukaan - The Fundamental Difference

### MongoDB (with Mongoose) 📦
**Flexible Dukaan** - Kuch bhi, kabhi bhi, kisi bhi shelf pe rakh sakte ho!

- **Document-based:** Ek JSON object jaisa structure
- **Flexible:** Notebooks ke saath pencils, chips ke saath shampoo
- **Cons:** Dhoondhne mein time, agar sahi jagah nahi rakha toh gandagi

**Example Document:**
```json
{
  "_id": "123",
  "name": "Rahul",
  "orders": [
    { "product": "Milk", "qty": 2 },
    { "product": "Bread", "qty": 1 }
  ]
}
```

### PostgreSQL (with Prisma) 🗄️
**Organized Dukaan** - Har cheez ki alag-alag shelf!

- **Table-based:** Fixed structure (schema)
- **Structured:** Dairy products ek taraf, groceries ek taraf
- **Benefits:** Clean, fast, aur reliable

**Example Tables:**
```sql
-- Customers Table
| id | name  |
|----|-------|
| 1  | Rahul |

-- Orders Table (Linked to customer)
| id | customer_id | product | qty |
|----|-------------|---------|-----|
| 99 |      1      |  Milk   |  2  |
| 100|      1      |  Bread  |  1  |
```

## 🛠️ Part 2: Dukaan Ke Managers

### Mongoose 👨‍💼
Tumhara woh dost jo MongoDB dukaan manage karta hai
- Manual schema definition
- Self-managed connections
- MongoDB-specific

### Prisma 🤖
Super-smart manager jo multiple databases handle karta hai
- Auto-generated client
- Type-safe operations
- Works with PostgreSQL, MySQL, SQLite, MongoDB
- English-like commands

## 💻 Part 3: Code Comparison

### 🚀 Setup & Installation

| Task | MongoDB (Mongoose) | PostgreSQL (Prisma) |
|------|-------------------|---------------------|
| **Install** | `npm install mongoose` | `npm install prisma --save-dev` |
| **Initialize** | - | `npx prisma init` |

### 📋 Schema Definition

#### Mongoose (models/User.js)
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);
```

#### Prisma (schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

**Update Database:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 🎯 Controller/Service Layer

#### Mongoose Controller
```javascript
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User({ 
      name: req.body.name, 
      email: req.body.email 
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
```

#### Prisma Controller
```javascript
// First setup Prisma Client (lib/prisma.js)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

// Controller
const prisma = require('../lib/prisma');

exports.createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
```

### 🛣️ Routes (Same for Both!)
```javascript
const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
```

## 📝 Command Cheat Sheet

| Operation | MongoDB (Mongoose) | PostgreSQL (Prisma) |
|-----------|-------------------|---------------------|
| **Install** | `npm install mongoose` | `npm install prisma --save-dev` |
| **Initialize** | - | `npx prisma init` |
| **Schema/Model** | Manual `mongoose.Schema()` | Define in `schema.prisma` |
| **Update DB** | - | `npx prisma migrate dev` |
| **Generate Client** | - | `npx prisma generate` |
| **Create Record** | `new Model(data).save()` | `prisma.model.create({ data: {...} })` |
| **Find Records** | `Model.find()` | `prisma.model.findMany()` |
| **Find One** | `Model.findOne()` | `prisma.model.findUnique()` |
| **Update** | `Model.updateOne()` | `prisma.model.update()` |
| **Delete** | `Model.deleteOne()` | `prisma.model.delete()` |

## 🎯 Bhai Ka Final Advice

### Choose MongoDB (Mongoose) when:
- ✅ Data structure starting mein clear nahi hai
- ✅ Quick prototyping karna hai
- ✅ Flexible schema requirements
- ✅ Document-based data makes sense

### Choose PostgreSQL (Prisma) when:
- ✅ Structured data chahiye
- ✅ Strong relationships (users, posts, orders, etc.)
- ✅ Reliability aur consistency important hai
- ✅ Type safety chahiye
- ✅ Modern, maintainable codebase banana hai

## 🚀 Getting Started

### For MongoDB + Mongoose:
```bash
npm install mongoose express
# Create your models and start coding!
```

### For PostgreSQL + Prisma:
```bash
npm install prisma @prisma/client express
npx prisma init
# Edit schema.prisma
npx prisma migrate dev --name init
npx prisma generate
# Start coding with type safety!
```

---

**Remember:** Dono powerful hain, bas use case ke according choose karna hai! 💪