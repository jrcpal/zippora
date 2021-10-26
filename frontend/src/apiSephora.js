import axios from "axios";

const BASE_URL = 'https://sephora.p.rapidapi.com/' 

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class SephoraApi {
  //the token for interactive with the API will be stored here.
  static token

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      'x-rapidapi-host': 'sephora.p.rapidapi.com',
      'x-rapidapi-key': '372931dc8amsh54eccf7018f3d77p1a62cfjsnddec1badf116'
    };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message 
      // throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /*********************************************************** Carousels */

  /** getFaceProducts: Get list of products for specific category from Sephora API with category id as parameter.
   * 
   * 
   */

  static async getFaceProducts() {
    const params = {categoryId: 'cat130058'}
    let res = await this.request(`products/list`, params);
    return res.products;
  }

  static async getEyeProducts() {
    const params = {categoryId: 'cat130054'}
    let res = await this.request(`products/list`, params);
    return res.products;
  }

  static async getLipProducts() {
    const params = {categoryId: 'cat180010'}
    let res = await this.request(`products/list`, params);
    return res.products;
  }

}




export default SephoraApi;
