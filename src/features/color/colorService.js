// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getColor = async () => {
  const response = await axios.get(`${base_url}/color/getAllColor`);
  return response.data;
};

const createColor = async (colorData) => {
  const response = await axios.post(
    `${base_url}/color/createColor`,
    colorData,
    config
  );
  return response.data;
};

const getColorById = async (id) => {
  const response = await axios.get(`${base_url}/color/getcolor/${id}`, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}/color/updateColor/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(
    `${base_url}/color/deletecolor/${id}`,
    config
  );
  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getColorById,
  updateColor,
  deleteColor,
};

export default colorService;
