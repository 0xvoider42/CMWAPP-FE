# Campaign Management UI
A modern web interface for the Campaign Management System built with Next.js 14, React, and TypeScript.
The application is deployed: https://cmwapp-8gqmpqm26-nicks-projects-0a3a799c.vercel.app/

## 🚀 Features
- Intuitive campaign creation and management interface
- Real-time campaign status toggling
- Country-specific payout management
- Advanced filtering and search capabilities
- Responsive design for all devices
- Type-safe development with TypeScript
- Server-side rendering with Next.js
- Containerized with Docker for easy deployment

## 📋 Prerequisites
- Node.js
- Docker and Docker Compose
- npm package manager

## 🛠️ Installation
1. Clone the repository:
    ```bash
      git clone [repository-url]
      cd campaign-management-ui
    ```
2. Install dependencies:
    ```bash
      npm install
    ```

## 🏃‍♂️ Running the Application
The application will be available at http://localhost:3000.

Development mode
  ```bash
    npm run dev
  ```
Production mode
  ```bash
    npm run build
    npm start
  ```

## 🔧 Configuration
The application can be configured through environment variables. Create a .env.local file in the root directory:
  ```bash
    NEXT_PUBLIC_API_URL=http://localhost:2222/api-v1
  ```
Note that API routes have a prefix ```/api-v1```

## 🔌 API Integration
The UI connects to the Campaign Management API with these endpoints:

- GET ```/api-v1/campaigns``` - List all campaigns
- POST ```/api-v1/campaigns``` - Create a new campaign
- GET ```/api-v1/campaigns/:id``` - Get campaign details
- PATCH ```/api-v1/campaigns/:id``` - Update campaign
- ```PATCH /api-v1/campaigns/:id/toggle``` - Toggle campaign status
