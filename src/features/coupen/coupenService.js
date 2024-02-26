// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getCoupen = async () => {
  const response = await axios.get(`${base_url}/coupen/getAllCoupen`);
  return response.data;
};

const createCoupen = async (coupenData) => {
  const response = await axios.post(
    `${base_url}/coupen/createCoupen`,
    coupenData,
    config
  );
  return response.data;
};

const getCoupenById = async (id) => {
  const response = await axios.get(
    `${base_url}/coupen/getcoupenById/${id}`,
    config
  );
  return response.data;
};

const updateCoupen = async (coupen) => {
  const response = await axios.put(
    `${base_url}/coupen/updatecoupen/${coupen.id}`,
    {
      name: coupen.coupenData.name,
      expiry: coupen.coupenData.discount,
      discount: coupen.coupenData.discount,
    },

    config
  );
  return response.data;
};
const deleteCoupen = async (id) => {
  const response = await axios.delete(
    `${base_url}/coupen/deleteCoupen/${id}`,
    config
  );
  return response.data;
};

const coupenService = {
  getCoupen,
  createCoupen,
  getCoupenById,
  updateCoupen,
  deleteCoupen,
};

export default coupenService;
