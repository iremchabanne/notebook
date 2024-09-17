// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific note from the database based on the provided ID
    const note = await tables.note.read(req.params.id);
    if (note == null) {
      res.sendStatus(404);
    } else {
      res.json(note);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const note = req.body;
  const { id } = req.params;

  try {
    await tables.note.update(note, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the note data from the request body
  const note = req.body;
  const userID = req.auth.sub;

  try {
    const insertId = await tables.note.create(note, userID);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted note
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.note.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  read,
  edit,
  add,
  destroy,
};
