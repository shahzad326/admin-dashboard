// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogCategory = async () => {
  const response = await axios.get(
    `${base_url}/blogCategory/getAllBlogCategory`
  );
  return response.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}/blogCategory/createBlogCategory`,
    blogCategory,
    config
  );
  return response.data;
};

const getBlogCategoryById = async (id) => {
  const response = await axios.get(
    `${base_url}/blogCategory/getBlogCategory/${id}`,
    config
  );
  return response.data;
};

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${base_url}/blogCategory/updateBlogCategory/${blogCategory.id}`,
    { title: blogCategory.blogCategoryData.title },
    config
  );
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/blogCategory/deleteBlogCategory/${id}`,
    config
  );
  return response.data;
};

const blogCategoryService = {
  getBlogCategory,
  createBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
