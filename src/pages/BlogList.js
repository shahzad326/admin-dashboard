import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBlog, deleteBlog, resetState } from "../features/blog/blogSlice";
import CustomModel from "../component/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [blogTitle, setBlogTitle] = useState(""); // Add state to store blog title

  const showModel = (blogId, blogTitle) => {
    setOpen(true);
    setBlogId(blogId);
    setBlogTitle(blogTitle);
  };

  const hideModel = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs.allBlogs);
  // console.log(blogState);

  const data1 = Array.isArray(blogState)
    ? blogState.map((blog, index) => ({
        key: index + 1,
        title: blog.title,
        category: blog.category,
        action: (
          <div>
            <Link
              to={`/admin/add-blog/${blog._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>

            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModel(blog._id, blog.title)}
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlog());
    }, 1000);
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4 title">blog List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          hideModel={hideModel}
          open={open}
          performAction={() => deleteABlog(blogId)}
          title={`Are you sure you want to delete "${blogTitle}" Blog?`} // Use brand title in the confirmation message
        />
      </div>
    </div>
  );
};

export default BlogList;
