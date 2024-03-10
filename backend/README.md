# LLM Order Backend
Backend of the project is made using Node.js, Express.js, Mongoose, MongoDB, <a href="https://js.langchain.com/docs/get_started/introduction">LangChain</a>, and OpenAI. It uses a sentiment check before answering to understand whether user wants to continue or end the conversation, and based on that the order is confirmed.

## Architecture
- The architecture in the project is of MVC(Model-View-Cantroller), with backend of models and cantrollers, and the high-level design is,
![image](https://github.com/mank-423/orderLLM/assets/96490105/726aa6d3-6520-405a-ba45-272f2f52b56c)

- The relations between the DB used:
![image](https://github.com/mank-423/orderLLM/assets/96490105/afb1cdf0-02a9-407b-aaaf-1f5badc9f8ee)

## Flows 
- For the conversation:
![image](https://github.com/mank-423/orderLLM/assets/96490105/72400dd2-9c80-4aaf-9743-53a313962f26)

- For authorisation:
![image](https://github.com/mank-423/orderLLM/assets/96490105/ac679025-dc35-42c4-9b67-bcacbf685e81)

## API Endpoints:

### Generate API
### (/api/generate) 
<br />

#### GET /allOrders/:email

Get details about all orders.

**Request:**
- Method: GET
- Endpoint: `/api/generate/allOrders/:email`

**Response:**
- 200 OK: Returns details about all orders of a user.
- 500 Internal Server Error: An error occurred on the server.

#### POST /order

Generate conversation response with the user.

**Request:**
- Method: POST
- Endpoint: `/api/generate/order`
- Body:
  ```json
  {
    "userPrompt": "User's input for generating an order."
  }
  ```
**Response:**
- 200 OK: Returns the chatbot's response and order confirmation details.
- 500 Internal Server Error: An error occurred on the server.

#### POST /confirm

Detection of confirmation of order

**Request:**
- Method: POST
- Endpoint: `/api/generate/confirm`
- Body:
  ```json
  {
    "orderPrompt": "Summarized order given by the AI."
  }
  ```
**Response:**
- 200 OK: Returns the chatbot's response and order confirmation details.
- 500 Internal Server Error: An error occurred on the server.

### User API
### (/api/users)
<br />

#### GET /isAdmin/:email

Check if a user with the specified email has admin privileges.

**Request:**
- Method: GET
- Endpoint: `/api/users/isAdmin/:email`

**Response:**
- 200 OK: Returns whether the user has admin privileges or not.
- 404 Not Found: User not found.
- 500 Internal Server Error: An error occurred on the server.

#### POST /auth

Authenticate a user based on provided credentials.

**Request:**
- Method: POST
- Endpoint: `/api/users/auth`
- Body:
  ```json
  {
  "name": "User Name",
  "email": "user@example.com",
  "userName": "username",
  "password": "userpassword"
  }
  ```
**Response:**
- 200 OK: Returns user authentication status and user details.
- 500 Internal Server Error: An error occurred on the server.

### Admin API
### (/api/admin)
<br />

#### GET /details

Get details about all users, orders, and other relevant statistics.

**Request:**
- Method: GET
- Endpoint: `/api/admin/details`

**Response:**
- 200 OK:  Returns details about all users, orders, and statistics
- 500 Internal Server Error: An error occurred on the server.
