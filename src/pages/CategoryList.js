import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  getProductCategory,
  resetState,
} from "../features/p-category/pcategorySlice";
import CustomModel from "../component/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [productCategoryID, setProductCategoryID] = useState("");
  const [productCategoryTitle, setProductCategoryTitle] = useState(""); // Add state to store brand title

  const showModel = (productCategoryID, productCategoryTitle) => {
    setOpen(true);
    setProductCategoryID(productCategoryID);
    setProductCategoryTitle(productCategoryTitle); // Set the brand title when the delete button is clicked
  };

  const hideModel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategory());
  }, [getProductCategory]);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productcategory.data
  );

  const data1 = Array.isArray(productCategoryState)
    ? productCategoryState.map((productcategory, index) => ({
        key: index + 1,
        title: productcategory.title,
        action: (
          <div>
            <Link
              to={`/admin/category/${productcategory._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() =>
                showModel(productcategory._id, productcategory.title)
              } // Pass brand title to showModel function
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteAProductCategory = (e) => {
    dispatch(deleteProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategory());
    }, 1000);
  };

  return (
    <div>
      <div className="">
        <h3 className="mb-4 title">Category List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          hideModel={hideModel}
          open={open}
          performAction={() => deleteAProductCategory(productCategoryID)}
          title={`Are you sure you want to delete "${productCategoryTitle}" Product Category?`}
        />
      </div>
    </div>
  );
};

export default CategoryList;
