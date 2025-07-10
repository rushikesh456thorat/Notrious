# 🏍️ Notrious

**Notrious** is a full-stack web application that helps users generate optimized product pages and ad templates for their Shopify stores and Meta Ads. Designed to streamline e-commerce workflows, it allows automatic product import, ad generation, and publishing — all from a single interface.

---

## 🚀 Tech Stack

| Frontend                               | Backend              |
| -------------------------------------- | -------------------- |
| [Vite](https://vitejs.dev/) + React.js | Node.js + Express.js |
| HTML & CSS                             | MongoDB              |
| React Router                           | Stripe for Payments  |
| Google OAuth                           | JWT Authentication   |

---

## 🌐 Project Structure

```
notrious/
├── backend/
│   ├── src/
├── frontend/
│   ├── src/
│   └── .env.demo
├── .env.demo
└── README.md
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/rushikesh456thorat/Notrious.git
cd notrious
```

---

### 2. Configure Environment Variables

Create your own `.env` files in both `frontend/` and `backend/` folders by copying the provided `.env.demo`:

#### Frontend (`frontend/.env`)

```bash
cp frontend/.env.demo frontend/.env
```

#### Backend (`backend/.env`)

```bash
cp backend/.env.demo backend/.env
```

Edit the newly created `.env` files and replace `<USE YOUR OWN>` with your actual credentials.

---

### 3. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

---

### 4. Run the Application

#### Frontend (Vite Dev Server)

```bash
npm run dev
```

#### Backend (Node.js Server)

```bash
npm run app
```

> 💡 Make sure MongoDB is running and your environment variables are correctly set up.

---

## ⚙️ Build for Production

### Frontend

```bash
npm run build
```

This will generate optimized static files in the `dist/` folder.

---

## 🧪 Features

* 🛒 Shopify Product Page Generation
* 📸 Meta Ad Template Creation
* 🔐 Secure Google OAuth Login
* 💳 Stripe-based Payment Integration
* 🧠 AI-powered Content Rewriting
* 📦 One-click Publishing to Shopify

---

## 📁 About `.env.demo`

The `.env.demo` files serve as a **template** for your actual environment variables.

### Frontend `.env.demo`

```env
VITE_API_DOMAIN='<USE YOUR OWN>'
VITE_GOOGLE_CLIENT_ID='<USE YOUR OWN>'
```

### Backend `.env.demo`

```env
MONGODB_URI='<USE YOUR OWN>'
JWT_SECRET='<USE YOUR OWN>'
STRIPE_SECRET_KEY='<USE YOUR OWN>'
STRIPE_WEBHOOK_SECRET='<USE YOUR OWN>'
DOMAIN='<USE YOUR OWN>'
GOOGLE_CLIENT_ID='<USE YOUR OWN>'
```

> ❗️**Never commit your actual `.env` files to GitHub.** Always use `.env.demo` in your repository and add `.env` to your `.gitignore`.

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License

---

## 🔗 Links

* 🔥 Live Preview: *coming soon*
* 🛠️ Admin Panel: *coming soon*
* 📙 Docs: *coming soon*

---
