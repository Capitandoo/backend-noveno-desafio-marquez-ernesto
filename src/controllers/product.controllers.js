import Controllers from "./class.controllers.js";
import ProductService from "../services/product.services.js";
import { logger } from "../utils/logger.js";
import { generateProductErrorAttributes } from "../middlewares/errors/info.js";
import CustomError from "../middlewares/errors/customError.js";
import EErrors from "../middlewares/errors/enum.js";

const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

  saveProduct = async (req, res) => {
    const { body } = req;
    let product = { ...body, status: true };
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      throw CustomError.createError({
        name: "TYPE_ERROR",
        cause: generateProductErrorAttributes(body),
        message: "Error trying to create the product.",
        code: EErrors.INVALID_TYPE_ERROR
      });
    }
      product.thumbnails = [];
      let response = await productService.saveProduct(product);
      response.send(response);
  };
  

  createMocksProducts = async (req, res) => {
    try {
      const response = await productService.createMocksProducts();
      res.status(200).json({ products: response });
    } catch (error) {
      logger.error(error);
    }
  };
  

}

/*export const getAllController = async (req, res, next) => {
  try {
    const { page, limit, key, value, sortField, sortOrder } = req.query;
    const allProducts = await getAllService (page, limit, key, value, sortField, sortOrder);
    const nextLink = allProducts.hasNextPage ? `http://localhost:8080/products?page=${allProducts.nextPage}` : null
    const prevLink = allProducts.hasPrevPage ? `http://localhost:8080/products?page=${allProducts.prevPage}` : null
    res.json ({
      results: allProducts.docs,
      info: {
          count: allProducts.totalDocs,
          pages: allProducts.totalPages,
          actualPage: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
          nextPageLink: nextLink,
          prevPageLink: prevLink
    }
  });
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getByIdService(id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const newDoc = await createService({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    });
    res.json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    await getByIdService(id);
    const docUpd = await updateService(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteService(id);
    res.json({ message: "Producto borrado satisfactoriamente!" });
  } catch (error) {
    next(error);
  }
};*/
