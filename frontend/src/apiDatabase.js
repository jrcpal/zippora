import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the Database.
 */

class DatabaseApi {
  //the token for interactive with the API will be stored here.
  static token

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${DatabaseApi.token}`
    };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /*********************************************************** Auth */
  /** signUp: Sign up new user.
   *    Accepts: newUser = { username, password }
   *    Returns: "token"
   */
  static async signUp(newUser) {
    let res = await this.request(`auth/register`, newUser, "post");
    return res.token;
  }

  /** login: Authorizes user.
   *    Accepts: loginCredentials = { username, password }
   *    Returns: "token"
   */
  static async login(loginCredentials) {
    let res = await this.request(`auth/token`, loginCredentials, "post");
    return res.token;
  }

  /*********************************************************** Users */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser({ username, ...updateData }) {
    await this.request(`users/${username}`, updateData, "patch");
    let user = await DatabaseApi.getUser(username);
    return user;
  }

}




export default DatabaseApi;
