# ⚡ Flash Sale Backend (Express + TypeScript)

โปรเจกต์ระบบ Backend สำหรับจัดการสินค้า (CRUD) และระบบยืนยันตัวตน พัฒนาด้วยสถาปัตยกรรมที่เน้นความเร็วและระเบียบของโค้ดภายใต้มาตรฐาน ESM

## 🛠 Tech Stack

* 🟢 **Runtime:** Node.js (High Performance)
* 🔵 **Language:** TypeScript (Strictly Typed)
* 🚂 **Framework:** Express.js (Minimalist & Fast)
* 🍃 **Database:** MongoDB via Mongoose (NoSQL Modeling)
* 🏗️ **Architecture:** MVC Pattern (Scalable Structure)

## 📁 Project Structure
```text
src/
├── controllers/    # Request Handling & Response logic
├── models/         # Database Schema & Models
├── services/       # Core Business Logic (Database interaction)
├── routes/         # API Routing endpoints
├── middlewares/    # Auth, Error, and Validation middlewares
├── utils/          # Utilities (AppError, CatchAsync)
├── app.ts          # Express App configuration
└── index.ts        # Server Entry Point (Database connection & Listen)

```
⚙️ Project Settings
เพื่อให้โปรเจกต์รองรับ ES Modules (ESM) และ TypeScript อย่างสมบูรณ์ ได้มีการตั้งค่าไฟล์หลักดังนี้:

1. nodemon.json
ใช้สำหรับดักจับการเปลี่ยนแปลงไฟล์ (Hot Reload) และรันด้วย ts-node/esm:
```
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "node --no-warnings --loader ts-node/esm ./src/index.ts"
}
```
2. package.json (Scripts)
```
{
  "type": "module",
  "scripts": {
    "dev": "nodemon",
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```
📦 Installation & Setup
1. Install Dependencies
Bash
npm install
2. Core Libraries
```   
npm i  express, mongoose, dotenv, cors, jsonwebtoken, bcryptjs
```
```
npm i typescript, nodemon, ts-node, @types/node, @types/express, @types/jsonwebtoken, @types/bcryptjs, @types/cors`○
```
🚀 How to Run
Development Mode:

Bash
npm run dev
Production Mode:

Bash
npm run build && npm start

🚀 How to Run
Development: npm run dev (ใช้ Nodemon รัน src/index.ts)

Production: npm run build แล้วตามด้วย npm start
