import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import ProductRepository from "../persistence/daos/repository/product.repository.js";
import { generateProduct } from "../utils/utils.js";

const {productManager} = factory;
const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super (productManager)
  }

  getProducts = async (limit, page, query, sort, key, value) => {
    await productRepository.getProducts (parseInt(limit), page, query, sort, key, value);
  };

  getProduct = async (id) => {
    await productRepository.getProduct(id);
  };

  saveProduct = async (product) => {
    await productRepository.addProduct(product);
  };

  deleteProduct = async (id) => {
    await productRepository.deleteProduct(id);
  };

  updateProduct = async (id, product) =>{
    await productRepository.updateProduct(id, product);
  };

  createMocksProducts = async () => {
    let product = [];
    for (let i = 0; i < 100; i++) {
      product.push(generateProduct());
    }
    const products = await productRepository.addProduct(product);
    return products;
  };

};


/*export const getAllService = async (page, limit, key, value, sortField, sortOrder) => {
  try {
    const docs = await prodDao.getProducts (page, limit, key, value, sortField, sortOrder);
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) throw new Error("Producto no encontrado");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (product) => {
  try {
    const newProd = await prodDao.addProduct(product);
    if (!newProd) throw new Error("Error de validacion!");
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, update) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) {
      throw new Error("Producto no encontrado");
    } else {
      const prodUpd = await prodDao.updateProduct(id, update);
      return prodUpd;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    return prodDel;
  } catch (error) {
    console.log(error);
  }
};*/
