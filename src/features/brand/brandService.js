// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBrand = async () => {
  const response = await axios.get(`${base_url}/brand/getAllBrand`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(
    `${base_url}/brand/createBrand`,
    brand,
    config
  );
  return response.data;
};

const getBrandById = async (id) => {
  const response = await axios.get(`${base_url}/brand/getBrand/${id}`, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}/brand/updateBrand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(
    `${base_url}/brand/deleteBrand/${id}`,
    config
  );
  return response.data;
};

const brandService = {
  getBrand,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};

export default brandService;
