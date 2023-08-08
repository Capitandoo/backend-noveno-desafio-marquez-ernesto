import MongoDao from "../mongo.dao.js";
import { ProductsModel } from "../models/ProductModel.js";


export default class ProductManager extends MongoDao {

  constructor() {
    super (ProductsModel)
  }

  /*async getProducts(page = 1, limit = 5, key, value, sortField, sortOrder) {
    try {
      const query = {};
      if (key && value ) {
          query[key] = value;
      };
      const options = {page, limit, sort: {}}
      if (sortField && sortOrder) {
          options.sort[sortField] = sortOrder;
      };
      const response = await ProductsModel.paginate({}, query, options);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const response = await ProductsModel.create (product);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductsModel.findById (id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, update) {
    try {
      const response = await ProductsModel.updateOne ({id: id}, update);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete (id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }*/
}
