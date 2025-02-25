## Create a Structured Project Architecture

todo-app-backend
│── controllers/
│── middleware/
│── models/
│── routes/
│── utils/
│── .env
│── server.js
│── config.js


## Install required dependencies
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors express-validator

## Install development dependencies:
npm install --save-dev nodemon


## Add a start script in package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
