const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const userController = require("../../../controllers/userActions");

const { hashPassword, verifyToken } = require("../../../services/auth");

// Route to get a specific item by ID

router.get("/notes", verifyToken, userController.browseNotes);

// Route to add a new item
router.post("/", hashPassword, userController.add);

const {
  read,
  add,
  destroy,
  edit,
} = require("../../../controllers/noteActions");

router.get("/notes/:id", verifyToken, read);

router.post("/notes/:id", verifyToken, add);

router.delete("/notes/:id", verifyToken, destroy);

router.put("/notes/:id", verifyToken, edit);

/* ************************************************************************* */

module.exports = router;
