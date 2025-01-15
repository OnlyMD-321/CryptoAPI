# **CryptoCore - Cryptocurrency Portfolio Management System**

CryptoCore is a RESTful API backend designed to simplify cryptocurrency portfolio management. It provides secure user authentication, real-time cryptocurrency data integration, and portfolio tracking, enabling users to manage their investments effectively. The API is deployed on Render and integrates with the CoinMarketCap API for accurate market data.

## **Project Structure**
The project is structured into several folders and files, each responsible for different aspects of the application:

|
|
|--- **src**
|   |--- **config**
|   |   |--- **config.js**
|   |--- **controllers**
|   |   |--- **authController.js**
|   |   |--- **cryptoController.js**
|   |   |--- **itemsPortfoliosController.js**
|   |   |--- **portfolioController.js**
|   |   |--- **performanceController.js**
|   |--- **factories**
|   |   |--- **crudFactory.js**
|   |--- **middlewares**
|   |   |--- **authMiddleware.js**
|   |--- **routes**
|   |   |--- **authRoutes.js**
|   |   |--- **cryptoRoutes.js**
|   |   |--- **portfolioRoutes.js**
|   |   |--- **performanceRoutes.js**
|   |   |--- **routes.js**
|   |--- **services**
|   |   |--- **authService.js**
|   |   |--- **cryptoService.js**
|   |   |--- **itemsPortfoliosService.js**
|   |   |--- **portfolioService.js**
|   |   |--- **performanceService.js**
|   |--- **utils**
|   |   |--- **createTables.js**
|   |   |--- **crons.js**
|   |   |--- **mailer.js**
|   |--- **view**
|   |   |--- **verificationForEmail.ejs**
|   |   |--- **verificationForPassword.ejs**
|   |--- **index.js**
|--- **.env**
|--- **README.md**
|--- **package-lock.json**


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
  - `cors`: For enabling Cross-Origin Resource Sharing in the server to handle requests from different origins.  
  - `crons`: For scheduling and running cron jobs in the application.  
  - `Design Patterns`: for maintaining clean, scalable, and maintainable code structures.  

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
    npm install
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
| POST   | `/auth/verify`    | Verify email.           |
| POST   | `/auth/login`     | Login and get a JWT.     |

### **Portfolio Management**
| Method | Endpoint               | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/portfolios`          | List all user portfolios.         |
| POST   | `/portfolios`          | Create a new portfolio.           |
| PUT    | `/portfolios/:id`      | Update a portfolio.               |
| DELETE | `/portfolios/:id`      | Delete a portfolio.               |

### **Items portfolio Management**
| Method | Endpoint                          | Description                       |
|--------|------------------------------------|-----------------------------------|
| POST   | `/:id/items`                      | Add an item to a portfolio.       |
| PUT    | `/:portfolio_id/items/:item_id`   | Update an item in a portfolio.    |
| DELETE | `/:portfolio_id/items/:item_id`   | Remove an item from a portfolio.  |

### **Performance Data**
| Method | Endpoint                                      | Description                                   |
|--------|-----------------------------------------------|------------------------------------------------|
| GET    | `/performance/:id`                               | Get performance data for a portfolio.      |
| GET    | `/performance/:id/profit-loss/:items_id`         | Calculate profit or loss for a portfolio.  |

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

