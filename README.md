# M-Pesa tRPC Payment Integration 💸

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.9+-blue.svg)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-v10-purple.svg)](https://trpc.io/)
[![Express](https://img.shields.io/badge/Express-v4-lightgrey.svg)](https://expressjs.com/)

A modern, type-safe M-Pesa payment integration using tRPC, React, and TypeScript for seamless mobile payments.

[Features](#-features) • [Installation](#-installation) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Architecture](#%EF%B8%8F-architecture) • [Environment Setup](#-environment-setup) • [API Documentation](#-api-documentation)


</div>

Here is a quick look up of the Result 
![Screenshot 2025-03-11 025123](https://github.com/user-attachments/assets/ec70c0fc-7117-4dde-80f6-6535366920c9)


## 🌟 Features

- **Secure M-Pesa Integration**
  - STK Push for direct customer payments
  - Secure token-based authentication
  - Automatic M-Pesa access token generation

- **Type-Safe API Communication**
  - End-to-end type safety with tRPC
  - Efficient error handling
  - Zod schema validation

- **Developer Experience**
  - Hot module reloading
  - TypeScript for enhanced code quality
  - Centralized environment configuration

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- M-Pesa Developer Account

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/IsoDevMate/MPESA-DARAJA-WITH-TRPC.git

# Navigate to project directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your M-Pesa API credentials

# Start the server
 npm start
```

### Frontend Setup
```bash
# Navigate to project directory
cd frontend

# Install dependencies
npm install

# In a new terminal, start the frontend
npm run dev
```

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- tRPC Client
- Superjson

### Backend
- Node.js with Express
- tRPC Server
- Zod for validation
- Axios for API requests

### M-Pesa Integration
- Safaricom Daraja API
- STK Push mechanism

## 🏗️ Architecture

```
┌───────────────┐      ┌───────────────┐      ┌────────────────┐
│               │      │               │      │                │
│  React Client │◄────►│  tRPC Server  │◄────►│  M-Pesa API    │
│               │      │               │      │                │
└───────────────┘      └───────────────┘      └────────────────┘
                                │
                        ┌───────┴───────┐
                        │               │
                        │  Environment  │
                        │  Variables    │
                        │               │
                        └───────────────┘
```

## 🔐 Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# M-Pesa API Credentials
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PAYBILL=your_paybill_number
MPESA_PASSKEY=your_passkey

# Callback URL
CALLBACKURL=your_callback_url

# Server Configuration
PORT=3000
```

## 📝 API Documentation

### M-Pesa STK Push

**Endpoint**: `/trpc/mpesa.stkPush`

**Method**: `POST`

**Input Schema**:
```typescript
{
  phone: string;  // Format: "0XXXXXXXXX"
  amount: number; // Integer value
}
```

**Response Schema**:
```typescript
{
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  CustomerMessage: string;
}
```

## 🧪 Testing the Integration

1. Start the frontend and backend servers
2. Click the "Pay with M-Pesa" button
3. Check the browser console for the response
4. Verify your phone receives the STK push notification

## 🔍 Troubleshooting

**Common Issues:**

- **"Failed to get access token"**: Check your M-Pesa consumer key and secret
- **"Failed to make payment"**: Verify the phone number format and amount
- **"CORS error"**: Make sure your frontend URL is allowed in the backend CORS settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
