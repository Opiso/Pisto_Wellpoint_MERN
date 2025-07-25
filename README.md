<<<<<<< HEAD
# Pisto_Wellpoint_MERN
=======
# 🩺 Pisto WellPoint – MERN Stack Healthcare Appointment System

**Pisto WellPoint** is a full-stack healthcare appointment platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The system supports secure, independent dashboards for **Admins**, **Doctors**, and **Users**, enabling seamless and transparent appointment scheduling and management.

🎯 **Aligned with UN SDG 3** – Good Health and Well-being: Promoting equitable, digital-first access to medical services.

---

## 🔐 Key Features

- 🔒 **Secure authentication** using JWT & bcrypt
- 👨‍⚕️ **Doctor dashboard**: Manage availability, view appointments, patient list
- 👤 **User dashboard**: Book, cancel, and track appointments
- 🧑‍💼 **Admin dashboard**: Approve doctors, manage users, view reports
- ⚙️ Role-based routing and protected routes
- 🌐 Responsive UI using **React.js + Bootstrap/Tailwind**
- ☁️ Cloud-ready & MongoDB Atlas compatible

---

## 🚀 Getting Started

### 📦 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher recommended)
- MongoDB (local or MongoDB Atlas)
- Git
- Code editor (VS Code recommended)

---

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-8-capstone_-Opiso.git
cd week-8-capstone_-Opiso/.git/

pnpm install

.env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongodb-uri>
JWT_SECRET=your_jwt_secret

pnpm run dev

cd client
pnpm install
pnpm run dev

```
🌍 Dashboards Overview
/admin → Admin Panel for managing users, doctors, and appointments

/doctor → Doctor Panel with calendar, patient list, availability

/user → Patient Portal to book, cancel, and view appointments

Each route is protected with JWT authentication and role-based access.


📈 Roadmap
 JWT Auth for all roles

 Role-based dashboards

 SMS/WhatsApp reminders

 M-Pesa & NHIF integration

 Analytics & reporting module

 Mobile app (React Native)

🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.


🌐 Contact
GitHub: [@Opiso] (https://github.com/Opiso)

Email: capisokokth@email.com

LinkedIn: [Capis Otieno](https://www.linkedin.com/in/capis-otieno-506526332/)

💙 SDG 3 Impact
This project supports UN Sustainable Development Goal 3 – "Ensure healthy lives and promote well-being for all at all ages."

By enabling affordable, digital-first access to medical care through smart scheduling, HealthBridge bridges gaps in access and transparency, especially in underserved communities.
>>>>>>> 92e6e6a (Create README.md)
