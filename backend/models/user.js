"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {

  /** Register, Get , Update, or Remove user information from database, including their product preferences.
   * { username, password, new, organic, sale }
   *
   *
   * Returns boolean true or false for the following db table columns {new, organic, sale}
   *
   * All user preferences are set to false by default 
   * */


  /** authenticate user with username, password.
   *
   * Returns { username }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  is_new AS "isNew",
                  is_organic AS "isOrganic",
                  on_sale AS "onSale"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, New, Organic, Sale }
   *
   * Throws BadRequestError on duplicate usernames.
   **/

  static async register(
      { username, password, isNew=false, isOrganic=false, onSale=false }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username has already been taken: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            is_new,
            is_organic,
            on_sale)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, is_new AS "isNew", is_organic AS "isOrganic", on_sale AS "onSale"`,
        [
          username,
          hashedPassword,
          isNew,
          isOrganic,
          onSale
        ],
    );

    const user = result.rows[0];

    return user;
  }



  /** Given a username, return data about user.
   *
   * Returns { username, New, Organic, Sale }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
            is_new AS "isNew",
            is_organic AS "isOrganic",
            on_sale AS "onSale"
           FROM users
           WHERE username = $1`,
        [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);


    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { password, is_new, is_organic, on_sale }
   *
   * Returns { username, is_new, is_organic, on_sale  }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          isNew: "is_new",
          isOrganic: "is_organic",
          onSale: "on_sale"
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username, 
                                is_new AS "isNew", 
                                is_organic AS "isOrganic", 
                                on_sale AS "onSale"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Set user preferences: update db, returns undefined.
   *
   * - username: username setting preferences
   **/

  static async setPreference(username) {
    const preCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`, [username]);
    const user = preCheck.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    await db.query(
          `UPDATE users
           VALUES ($1, $2)`,
        [preferenceId, username]);
  }
}


module.exports = User;
