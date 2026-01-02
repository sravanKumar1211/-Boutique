🛍️ Luxury Silk & Jewelry online sales Platform

A high-performance full-stack online sales platform tailored for luxury silk and jewelry retail.
Built with scalability, security, and real-world production use in mind.

This platform integrates secure payments, automated communications, and a powerful admin dashboard for complete inventory and order control.

🚀 Tech Stack Overview
Layer	Technology
Frontend	React, Redux Toolkit, Tailwind / MUI
Backend	Node.js, Express.js
Database	MongoDB + Mongoose
Payments	Razorpay
Media CDN	Cloudinary
Emails	Nodemailer
Auth	JWT (JSON Web Tokens)
💳 Payment Gateway – Razorpay

A secure and seamless checkout experience powered by Razorpay API.

Key Implementations

🔐 Secure Transactions using RSA encryption

🧾 Unique Order ID generation on backend to prevent double billing

🔄 Webhook Signature Verification to validate payment authenticity

✅ Order status is updated only after verified payment

☁️ Media Management – Cloudinary

All product images are managed through Cloudinary CDN for performance and reliability.

Features

📱 Dynamic Image Resizing based on device

🗑️ Automatic deletion of orphaned images when products are removed

⚡ Optimized delivery via CDN

📤 Base64 image upload support from Admin dashboard

📧 Communication System – Nodemailer

Automated email notifications keep both users and admins informed.

Email Triggers

📦 Order confirmation & payment receipts (HTML templates)

🔐 Secure Forgot Password reset emails

🛎️ Admin alerts (low stock / high-value orders)

📦 Core Features
👤 Customer Experience

🔍 Advanced Product Search (server-side)

🗂️ Category filtering & price range sliders

📄 Dynamic Pagination for large inventories

⭐ Authenticated Reviews & Ratings

Average Rating
=
∑
Review Ratings
Total Reviews
Average Rating=
Total Reviews
∑Review Ratings
	​


🛒 Persistent Cart with quantity & stock validation

🖥️ Admin Dashboard (Control Center)

A centralized panel to manage the entire business.

Inventory Management

📊 Live stock indicators (🟢 In Stock / 🔴 Low Stock)

✏️ Full CRUD operations for products

🖼️ Integrated Cloudinary image management

User Management

👥 View all users

📦 Track user order history

🔐 Role-based access control (Admin / User)

📂 Project Folder Structure

luxury-ecommerce/
├── backend/
│   ├── controllers/        # Business logic (Products, Orders, Razorpay, Cloudinary)
│   ├── middleware/         # Auth, Error Handling, Async Wrapper
│   ├── models/             # Mongoose Schemas (User, Product, Order)
│   ├── routes/             # API Routes
│   ├── utils/              # API Features, Nodemailer Config
│   ├── config/             # Database & Environment Config
│   └── server.js           # Server Entry Point
│
├── frontend/
│   ├── src/
│   │   ├── features/       # Redux Slices (productSlice, adminSlice, cartSlice)
│   │   ├── components/     # Reusable UI Components (Navbar, Pagination)
│   │   ├── pages/          # Page Views (ProductList, ProductDetails, Admin)
│   │   ├── utils/          # Helper Functions
│   │   ├── store.js        # Redux Store
│   │   └── main.jsx        # App Entry
│
└── README.md

🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/sravanKumar1211/-Boutique

2️⃣ Backend Environment Setup

Create a .env file inside the backend folder:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

3️⃣ Install Dependencies & Run
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev


🛡️ Production Readiness
✅ Error Handling


Centralized HandleError class


Consistent JSON error responses


Prevents frontend crashes


✅ Async Safety


All controllers wrapped using handleAsyncError


Prevents unhandled promise rejections


✅ Data Validation


Strict Mongoose schema rules


Price, stock limits & mandatory image checks


✅ Security


JWT authentication


Razorpay webhook signature verification


Secure password hashing & reset tokens



📌 Ideal Use Case


Luxury Silk Boutiques


Jewelry Stores


Single-Vendor or Admin-Managed E-Commerce


Production-grade MERN projects for portfolios



If you want, I can also:


✅ Add deployment steps (AWS / Vercel / Render)


✅ Create API documentation


✅ Optimize README for recruiter / portfolio impact


✅ Convert this into a professional GitHub showcase


By G Savan Kumar

git clone https://github.com/sravanKumar1211/-Boutique