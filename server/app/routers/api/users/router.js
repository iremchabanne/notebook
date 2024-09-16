const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const userController = require("../../../controllers/userActions");

const { hashPassword, verifyToken } = require("../../../services/auth");

// Route to get a list of items
router.get("/", verifyToken, userController.browse);

// Route to get a specific item by ID
router.get("/:id", verifyToken, userController.read);

// Route to add a new item
router.post("/", hashPassword, userController.add);

const {
  browse,
  read,
  add,
  destroy,
  edit,
} = require("../../../controllers/noteActions");

router.get("/user/:id/notes", verifyToken, browse);

router.get("/user/:id/notes/:id", verifyToken, read);

router.post("/user/:id/notes/:id", verifyToken, add);

router.delete("/user/:id/notes/:id", verifyToken, destroy);

router.put("/user/:id/notes/:id", verifyToken, edit);

/* ************************************************************************* */

module.exports = router;
