# 🚀 express-boilerplate-prisma

Boilerplate Express.js + TypeScript + Prisma untuk memulai pengembangan backend yang clean, modular, dan scalable.

---

## 📦 Tech Stack

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [pnpm](https://pnpm.io/) – disarankan sebagai package manager

---

## 🛠️ Instalasi & Setup
### 1. Clone repository
<ol>
  <li>git clone https://github.com/ainurcoding/express-boilerplate-prisma.git</li>
  <li>cd express-boilerplate-prisma</li>
</ol>

### 2. Install dependencies
1. pnpm install

### 3. Setup environment variable
1. cp .env.template .env

## 🔗 Prisma Setup
### 4. Generate model dari database yang sudah ada
1. npx prisma db pull (adjustmen with your database contain)

### 5. Generate Prisma Client
1. npx prisma generate

## 🚀 Menjalankan Project
### 6. Jalankan development server
1. pnpm dev

## 📁 Struktur Folder
```
src/
├── core/
│   ├── config/          # Konfigurasi environment & prisma client
│   ├── middlewares/     # Middleware Express
│   └── routes.ts        # Route utama aplikasi
├── modules/             # Modularisasi fitur (auth, user, post, dll)
├── app.ts               # Setup Express
├── server.ts            # Entry point server
prisma/
├── schema.prisma        # Definisi model Prisma
```

## Script Penting (package.json)
✅ Script Penting (package.json)
```
"scripts": {
  "dev": "ts-node-dev --respawn --clear --transpile-only -r tsconfig-paths/register ./src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "node dist/app.js",
  "test": "jest",
  "test:watch": "jest --watchAll",
  "test:coverage": "jest --coverage"
}
```

### ❤️ Credit
`Dibuat dengan ❤️ oleh @ainurcoding`
---
