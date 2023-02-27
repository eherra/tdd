import argon2 from "@node-rs/argon2";
import pg from "pg";
import dotenv from "dotenv"
dotenv.config();

export class PostgresUserDao {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.NODE_ENV !== 'test' ? process.env.PGDATABASE : process.env.PGDATABASE_TEST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  close() {
    this.db.end();
  }

  rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.rowToUser)[0] || null;
  }

  async save(user) {
    return await this.db
      .query(
        `insert into users (user_id, password_hash)
      values ($1, $2)
      on conflict (user_id) do update
          set password_hash = excluded.password_hash`,
        [user.userId, user.passwordHash])
      .then((res) => {
        return res.rowCount
      })
      .catch((err) => console.error('Error on saving', err.stack))
  }

  async runQuery(query, values) {
    return this.db.query(query, values);
  }
}

export class PasswordService {

  constructor(db) {
    this.users = db;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    this.validateOldPasswordMatch(user.passwordHash, oldPassword);
    user.passwordHash = this.getNewPasswordHash(newPassword);
    return await this.users.save(user);
  }

  validateOldPasswordMatch(dbOldPassword, oldPassword) {
    if (!argon2.verifySync(dbOldPassword, oldPassword)) {
      throw new Error("wrong old password");
    }
  }

  getNewPasswordHash(newPassword) {
    try {
      return argon2.hashSync(newPassword);
    } catch (error) {
      console.log(error);
      throw new Error("Error occurred while hashing new password");
    }
  }
}

// console.log(argon2.hashSync("keke"))
// //keke hash = $argon2id$v=19$m=4096,t=3,p=1$FgdUp2m0tiWulb0bgyvywA$RYyMSLxZn6/gC3Yf9Mh9mLuB43wvKWXVxPMy1xS+IrA

// const dao = PostgresUserDao.getInstance();
// const s = new PasswordService(dao);
// console.log(await s.changePassword(1, "keke", "keke"));
