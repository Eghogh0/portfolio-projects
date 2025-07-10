# 🍽️ TastyBites Web App

TastyBites is a lightweight fullstack web application for managing restaurant customers. Built with **React** (frontend) and **FastAPI** (backend), it allows users to view and manage customer profiles and order history. Designed as a functional prototype without a database — all data is stored in memory and lost on refresh.

## 📱 Features

- **Customer Profile Table**
  - Full Name
  - Email
  - Phone Number
  - Birthday
  - Favorite Meal

- **Order History Table**
  - Order ID
  - Customer Name
  - Items Ordered
  - Order Date
  - Total Amount

- **CRUD Operations**
  - Add, edit, and delete customers and orders (temporary, no persistence)

- **User Interface**
  - Orange-themed branding
  - Responsive layout
  - Accessible via [tastybites.com](https://github.com/Eghogh0/portfolio-projects/tree/43b7f9d4a2b284faa3f6f9552e3db2d3e5de43dd/tastybites-app) (localhost)

## 🛠 Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** FastAPI
- **Storage:** In-memory Python lists (no database)
- **No deployment tools used (e.g., NGINX or SQL)**

## 📂 Folder Structure
tastybites/
├── frontend/
│ ├── src/
│ │ ├── main.tsx
│ │ ├── components/
│ │ │ ├── CustomerTable.tsx
│ │ │ └── OrderTable.tsx
│ └── public/
├── backend/
│ ├── main.py
│ └── routers/
│ ├── customers.py
│ └── orders.py
└── snapshots/
└── customer-list.png


## 🚀 Getting Started

### Backend (FastAPI)

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Create and activate virtual environment:
``bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3. Install FastAPI and Uvicorn:
pip install fastapi uvicorn

4. Run the FastAPI server
uvicorn main:app --reload

### Frontend(React)
1. Navigate to the frontend folder:
bash
cd frontend

2. Install dependencies:
npm install

3. Start the React app
npm run dev

⚠️ Notes
This is a prototype. No data is saved after a refresh.

Intended for academic demonstration purposes only.

API routes and UI are functional and simulate CRUD using memory.

👩‍💻 Author
Esele Eghogho
Pan-Atlantic University
Computer Science Department

📄 License
This project is for academic and personal use only.
