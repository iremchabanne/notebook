const express = require("express");

const router = express.Router();

const { verifyToken } = require("../../services/auth");

const authRouter = require("../../controllers/authActions");

router.post("/login", authRouter.login);

router.get("/verify-auth", verifyToken, authRouter.isLoggedIn);

router.get("/logout", verifyToken, authRouter.logout);

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

module.exports = router;
