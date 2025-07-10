# 👩‍🍳 Chef Maria App

A mobile restaurant customer management app built for Chef Maria’s restaurant. This app allows staff to easily manage customer profiles and view order history. Built with Expo Router using React Native.

## 📱 Features

- **Customer Profile Tab**  
  Add and view customer details:
  - Full Name  
  - Phone Number  
  - Email Address  
  - Favorite Meal  
  - Birthday  

- **Order History Tab**  
  View order records with:
  - Order ID  
  - Customer Name  
  - Items Ordered  
  - Order Date  
  - Total Amount  

- **Red Theme + Logo**  
  Styled with a red theme and includes the restaurant’s logo.

## 🛠 Tech Stack

- React Native (Expo)
- Expo Router (Tabs template)
- Tailwind CSS via `nativewind`
- No backend – data is not persisted

## 📂 Project Structure
src/
├── app/
│ ├── _layout.tsx
│ ├── customer-profile.tsx
│ └── order-history.tsx
├── components/
│ ├── CustomerForm.tsx
│ └── OrderCard.tsx
└── assets/
└── logo.png


## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI  
  Install via:  
  ```bash
  npm install -g expo-cli

git clone https://github.com/Eghogh0/chef-maria-app.git
cd chef-maria-app
npm install
npx expo start

⚠️ Notes
This is a prototype for academic purposes.
Data is not saved when the app is closed or refreshed.

👩‍🎓 Author
Esele Eghogho
Pan-Atlantic University
Computer Science Department
