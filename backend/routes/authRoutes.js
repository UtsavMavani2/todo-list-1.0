// const express = require("express");
// const { body } = require("express-validator");
// const { registerUser, loginUser } = require("../controllers/authController");

// const router = express.Router();

// router.post(
//   "/register",
//   [
//     body("name", "Name is required").notEmpty(),
//     body("email", "Invalid email").isEmail(),
//     body("password", "Password must be at least 6 characters").isLength({
//       min: 6,
//     }),
//   ],
//   registerUser
// );

// router.post(
//   "/login",
//   [
//     body("email", "Invalid email").isEmail(),
//     body("password", "Password is required").exists(),
//   ],
//   loginUser
// );

// module.exports = router;

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
