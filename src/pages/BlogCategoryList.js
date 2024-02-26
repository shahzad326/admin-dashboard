import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCategory,
  deleteBlogCategory,
  resetState,
} from "../features/blog-category/blogCategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];
const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryId, setBlogCategoryId] = useState("");
  const [blogCategoryTitle, setBlogCategoryTitle] = useState(""); // Add state to store brand title

  const showModel = (blogCategoryId, blogCategoryTitle) => {
    setOpen(true);
    setBlogCategoryId(blogCategoryId);
    setBlogCategoryTitle(blogCategoryTitle);
  };

  const hideModel = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategory());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategory.data
  );

  const data1 = Array.isArray(blogCategoryState)
    ? blogCategoryState.map((blogCategory, index) => ({
        key: index + 1,
        title: blogCategory.title,
        action: (
          <div>
            <Link
              to={`/admin/blog-category/${blogCategory._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModel(blogCategory._id, blogCategory.title)} // Pass brand title to showModel function
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteABlogCategory = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategory());
    }, 1000);
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4 title">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          hideModel={hideModel}
          open={open}
          performAction={() => deleteABlogCategory(blogCategoryId)}
          title={`Are you sure you want to delete "${blogCategoryTitle}" brand?`} // Use brand title in the confirmation message
        />
      </div>
    </div>
  );
};

export default BlogCategoryList;
