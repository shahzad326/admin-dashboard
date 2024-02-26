// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategory = async () => {
  const response = await axios.get(
    `${base_url}/category/getAllProductCategory`
  );
  return response.data;
};

const createProductCategory = async (productCategory) => {
  const response = await axios.post(
    `${base_url}/category/createProductCategory`,
    productCategory,
    config
  );
  return response.data;
};

const getProductCategoryById = async (id) => {
  const response = await axios.get(
    `${base_url}/category/getProductCategory/${id}`,
    config
  );
  return response.data;
};

const updateProductCategory = async (productCategory) => {
  const response = await axios.put(
    `${base_url}/category/updateProductCategory/${productCategory.id}`,
    { title: productCategory.productCategoryData.title },
    config
  );
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/category/deleteProductCategory/${id}`,
    config
  );
  return response.data;
};

const productCategoryService = {
  getProductCategory,
  createProductCategory,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};

export default productCategoryService;
