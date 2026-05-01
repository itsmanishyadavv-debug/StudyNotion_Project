# 📚 StudyPulse

![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge) ![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge)

> **Empowering Learning, One Click at a Time**  
> StudyPulse is a **full-featured Ed-Tech platform** built with the **MERN stack** that enables students to learn, track progress, and engage with interactive educational content. Designed for smooth performance, modern UI, and a seamless user experience.

---

## 🌐 Live Demo
🚀[Visit StudyPulse](https://studypulse-phi.vercel.app)
> ⚠ **Note:** If the website is not opening, try accessing it in **Incognito Mode**.

---

## ✨ Features
- 🔐 **User Authentication** – Secure login & signup with JWT
- 👨‍🏫 **Role-based Access** – Student & Admin/Instructor dashboards
- 📚 **Course Management** – Create, edit, delete, and publish courses
- 💳 **Payment Integration** – Easy and secure payments
- ☁ **Cloud Storage** – Media hosting with Cloudinary
- 📱 **Responsive UI** – Fully mobile-friendly design
- ⚡ **Real-time Updates** – Dynamic UI without page reload

---

## 🛠️ Tech Stack
**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Authentication:** JWT & Cookies  
**Cloud Storage:** Cloudinary  
**Deployment:** Vercel (Frontend), Render/Other (Backend)

---

## 📂 Folder Structure
```
studypulse/
│
├── components/   # Reusable UI components
├── pages/        # Application pages
├── server/       # Backend (Node + Express + MongoDB)
├── utils/ 
.
.
.
.
└── README.md     # Project documentation
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Manish-1509/studyPulse.git
cd studyPulse
```

### 2️⃣ Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ..
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file inside **server/** and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYMENT_GATEWAY_KEY=your_payment_key
PAYMENT_GATEWAY_SECRET=your_payment_secret
```

### 4️⃣ Run the Development Servers
```bash
# Backend
cd server
npm run dev

# Frontend
cd ..
npm start
```

### 5️⃣ Open in Browser
```
Frontend: http://localhost:3000
Backend:  http://localhost:4000
```


## 🐞 Bug Reporting
If you find any bugs, please **email me** at **my474421@gmail.com** with the subject:  
`studypulse bug found`

**Made with ❤️ by [Manish](https://www.linkedin.com/in/manish-yadav-22731725a/)**
