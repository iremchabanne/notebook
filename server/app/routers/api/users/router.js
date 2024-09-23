const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const userController = require("../../../controllers/userActions");

const { hashPassword, verifyToken } = require("../../../services/auth");

const {
  read,
  add,
  destroy,
  edit,
} = require("../../../controllers/noteActions");

// Route to get a specific item by ID

router.get("/notes", verifyToken, userController.browseNotes);
router.get("/me", verifyToken, userController.readMe);

// Route to add a new item
router.post("/", hashPassword, userController.add);
router.post("/notes", verifyToken, add);

router.get("/notes/:id", verifyToken, read);

router.delete("/notes/:id", verifyToken, destroy);

router.put("/notes/:id", verifyToken, edit);

/* ************************************************************************* */

module.exports = router;
