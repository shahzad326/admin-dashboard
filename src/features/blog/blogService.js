// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlog = async () => {
  const response = await axios.get(`${base_url}/blog/getAllBlogs`);
  return response.data;
};

const createBlog = async (blogData) => {
  // console.log(blogData);
  const response = await axios.post(
    `${base_url}/blog/createBlog`,
    blogData,
    config
  );
  return response.data;
};

const getBlogById = async (id) => {
  const response = await axios.get(`${base_url}/blog/getBlog/${id}`, config);
  return response.data;
};

const updateBlog = async (blog) => {
  // console.log(blog);
  const response = await axios.put(
    `${base_url}/blog/updateBlog/${blog.id}`,
    {
      title: blog.blogData.title,
      category: blog.blogData.category,
      description: blog.blogData.description,
      images: blog.blogData.images,
    },
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(
    `${base_url}/blog/deleteBlog/${id}`,
    config
  );
  return response.data;
};

const blogService = {
  getBlog,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};

export default blogService;
