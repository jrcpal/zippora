 /** Get or Update db of user's preferences for product results.
   *
   DECIDED TO MERGE PREFERENCES INTO USERS TABLE FOR NOW. THIS PAGE WOULD HAVE BEEN USED IF SPLITTING USERS AND PREFERENCES INTO TWO TABLES.
   * */


"use strict";

const db = require("../db");
const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for preferences. */

class Preference {
  /** Get or Update db of user's preferences for product results.
   *
   *
   * Returns boolean true or false for the following db table columns {onSale, Organic, ...}
   *
   * All user preferences are set to false by default 
   * */



  /** Given a user, return data about user's preferences.
   *
   * Returns { onSale, Organic, ... }
   *   where username is [{ username }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(preferences) {
    const preferenceRes = await db.query(
        `SELECT onSale,
                isOrganic,
                ...
           FROM preferences
           WHERE userId = $1`,
        [userId]);

    const preferences = preferencesRes.rows[0];

    if (!userId) throw new NotFoundError(`No such user: ${userId}`);

    return preferences;
  }

  /** Update user's preferences data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {onSale, organic, ...}
   *
   * Returns {onSale, organic, ... }
   *
   * Throws NotFoundError if not found.
   */

  static async update(preferences, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE preferences
                      SET ${setCols}
                        WHERE userId = ${handleVarIdx}
                        RETURNING userId, onSale, organic`;
    const result = await db.query(querySql, [...values, userId]);
    const preferences = result.rows[0];

    if (!userId) throw new NotFoundError(`No userId: ${userId}`);

    return preferences;
  }
}


module.exports = Preference;
