const AbstractRepository = require("./AbstractRepository");

class SharedNoteRepository extends AbstractRepository {
  constructor() {
    super({ table: "SharedNote" });
  }

  async create(sharedEmail, noteId, sharedUserId) {
    const [result] = await this.database.query(
      `insert into ${this.table} (shared_user_email, note_id, shared_user_id) values (?,?,?)`,
      [sharedEmail, noteId, sharedUserId]
    );
    return result.insertId;
  }
}

module.exports = SharedNoteRepository;
