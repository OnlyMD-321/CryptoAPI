# **CryptoCore - Cryptocurrency Portfolio Management System**

CryptoCore is a RESTful API backend designed to simplify cryptocurrency portfolio management. It provides secure user authentication, real-time cryptocurrency data integration, and portfolio tracking, enabling users to manage their investments effectively. The API is deployed on Render and integrates with the CoinMarketCap API for accurate market data.

## **Table of Contents**
1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Setup and Installation](#setup-and-installation)  
4. [API Endpoints](#api-endpoints)  
5. [Future Enhancements](#future-enhancements)  
6. [License](#license)

---

## **Features**
- **User Authentication**: Secure signup and login using bcrypt and JWT.  
- **Portfolio Management**:  
  - Create, update, and delete portfolios.  
  - Add cryptocurrencies with acquisition cost and quantity.  
- **Real-Time Data**: Fetch live cryptocurrency data, including prices, market caps, and 24-hour trading volumes.  
- **Admin Dashboard (Future)**: Manage users and monitor system activity.  

---

## **Technologies Used**
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **Authentication**: bcrypt, JWT  
- **API Integration**: CoinMarketCap API  
- **Deployment**: Render (Free Plan)  
- **Utilities**:  
  - `axios`: For HTTP requests.  
  - `dotenv`: For managing environment variables.  
  - `sequelize`: ORM for database operations.  

---

## **Setup and Installation**

### **Prerequisites**
1. Node.js installed on your system.  
2. PostgreSQL database set up.  
3. CoinMarketCap API key (sign up [here](https://coinmarketcap.com/api/)).  

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/OnlyMD-321/CryptoAPI.git
   cd CryptoAPI
   ```
2.  **Run Migrations**:
    ```bash
    npx sequelize-cli db:migrate
    ```
3. **Start the Server**
    ```bash
    npm start
    ```
### **Access the API**
The API will be available at:  
`http://localhost:5000` (or the Render-provided URL for production).


   ## **API Endpoints**

### **Authentication**
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/auth/signup`    | Register a new user.     |
| POST   | `/auth/login`     | Login and get a JWT.     |

### **Portfolio Management**
| Method | Endpoint               | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/portfolios`          | List all user portfolios.         |
| POST   | `/portfolios`          | Create a new portfolio.           |
| PUT    | `/portfolios/:id`      | Update a portfolio.               |
| DELETE | `/portfolios/:id`      | Delete a portfolio.               |

### **Cryptocurrency Data**
| Method | Endpoint            | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/cryptos`          | List top 100 cryptocurrencies.    |
| GET    | `/cryptos/:id`      | Get details of a cryptocurrency.  |

---

## **Future Enhancements**
1. **Frontend Integration**:
   - Develop a user-friendly interface using AngularJS.
2. **Deployment with Docker and Kubernetes**:
   - Containerize the application for scalability and portability.
3. **Admin Dashboard**:
   - Add administrative tools for managing users and monitoring system activity.
4. **Advanced Analytics**:
   - Implement portfolio performance insights and predictive analytics.
5. **Mobile Application**:
   - Develop a mobile app for on-the-go portfolio management.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### **Live API**
The live API is hosted on Render and accessible at:  
**[https://cryptoapi-45oq.onrender.com](https://cryptoapi-45oq.onrender.com)**

---

