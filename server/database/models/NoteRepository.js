const AbstractRepository = require("./AbstractRepository");

class NoteRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "note" as configuration
    super({ table: "note" });
  }

  // The C of CRUD - Create operation

  async create(note, userId) {
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, title, content) values (?, ?, ?)`,
      [userId, note.title, note.content]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readSharedNotes(userId) {
    const [rows] = await this.database.query(
      `select title, content, n.id from ${this.table} n inner join SharedNote sn on n.id = sn.note_id where sn.shared_user_id = ?`,
      [userId]
    );
    return rows;
  }

  async update(note, id) {
    const [result] = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [note, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = NoteRepository;
