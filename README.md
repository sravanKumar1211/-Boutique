# -Boutique

🛍️ Luxury Silk & Jewelry E-Commerce PlatformA high-performance, full-stack e-commerce solution tailored for luxury retail. This platform integrates secure payments, automated communications, and a robust administrative suite for total inventory control.🚀 Core Technologies & Integration💳 Payment Gateway: RazorpayThe platform features a seamless checkout experience using the Razorpay API.Secure Transactions: Uses RSA encryption for data safety.Order Creation: Backend generates a unique Order ID for every transaction to prevent double-billing.Webhook Verification: Implements signature verification to ensure payments are authentic before updating order status in the database.☁️ Media Management: CloudinaryAll product imagery is managed via Cloudinary's professional-grade CDN.Dynamic Resizing: Automatically serves optimized images based on user device.Storage Efficiency: The backend logic ensures "Orphaned Images" are deleted from the cloud when a product is removed.Base64 Support: Handles seamless uploads directly from the Admin dashboard.📧 Communication: NodemailerAutomated email triggers keep users informed throughout their journey.Order Receipts: Professional HTML emails sent upon successful Razorpay payment.Account Security: Sends secure reset tokens for "Forgot Password" functionality.Admin Alerts: Optional notifications for low stock or new high-value orders.📦 Features & Functionalities👤 Customer ExperienceAdvanced Product Discovery: Server-side search, category filtering, and price-range sliders.Dynamic Pagination: Smooth navigation through large inventories using a custom-built pagination component.Intelligent Reviews: Authenticated users can rate and review products. The system automatically calculates the average rating ($\text{Ratings} = \frac{\sum \text{review ratings}}{\text{total reviews}}$).Persistent Cart: State-driven shopping cart that tracks product quantity and availability.🖥️ Admin Dashboard (The Control Center)The Admin Panel provides a full overview of the business health:Inventory Management: * Live Stock Tracking: Visual indicators (Green/Red) to highlight stock health.Full CRUD: Comprehensive interface to Create, Read, Update, and Delete products.Image Management: Integrated Cloudinary interface to upload and manage product visuals.User Oversight: View and manage user accounts and their order history.📂 Project StructurePlaintext├── backend/
│   ├── controllers/        # Business logic (Razorpay, Cloudinary, Products)
│   ├── middleware/         # Auth, Global Error Handling
│   ├── models/             # Mongoose Schemas (Product, User, Order)
│   ├── utils/              # API Features, Nodemailer config
│   └── server.js           # Server Entry Point
├── frontend/
│   ├── src/
│   │   ├── features/       # Redux Slices (adminSlice, productSlice)
│   │   ├── components/     # UI Kits (Pagination, Navbar, PageTitle)
│   │   ├── pages/          # View Logic (ProductsList, CreateProduct)
│   │   └── store.js        # Global Redux Store
🛠️ InstallationClone the Repo:Bashgit clone https://github.com/yourusername/luxury-ecommerce.git
Environment Setup:Create a .env file in the backend directory:Code snippetPORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
Install & Run:Bash# Backend
cd backend && npm install && npm start

# Frontend
cd frontend && npm install && npm run dev
🛡️ Production ReadinessError Handling: A custom HandleError class ensures that all API errors return consistent JSON responses, preventing frontend crashes.Data Validation: Mongoose schemas enforce strict rules on price, stock limits, and mandatory image uploads.Async Safety: All controllers are wrapped in a handleAsyncError utility to catch and pass potential server crashes to the global error middleware.