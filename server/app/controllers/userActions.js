const tables = require("../../database/tables");

const browseNotes = async (req, res, next) => {
  try {
    const notes = await tables.user.getNotes(req.auth.sub);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const userExists = await tables.user.readByEmail(req.body.email);
    if (userExists) {
      res.status(409).json({
        message: "We already have a user with this email, please sign in.",
      });
      return;
    }

    const user = req.body;
    if (!user || !user.username || !user.email || !user.hashedPassword) {
      res.sendStatus(400);
      return;
    }

    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browseNotes,
  read,
  add,
};
