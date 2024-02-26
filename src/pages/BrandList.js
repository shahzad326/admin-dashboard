import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrand,
  deleteBrand,
  resetState,
} from "../features/brand/brandSlice";
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
const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [brandTitle, setBrandTitle] = useState(""); // Add state to store brand title

  const showModel = (brandId, brandTitle) => {
    setOpen(true);
    setBrandId(brandId);
    setBrandTitle(brandTitle); // Set the brand title when the delete button is clicked
  };

  const hideModel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrand());
  }, [getBrand]);

  const brandState = useSelector((state) => state.brand.brands.data);

  const data1 = Array.isArray(brandState)
    ? brandState.map((brand, index) => ({
        key: index + 1,
        title: brand.title,
        action: (
          <div>
            <Link to={`/admin/brand/${brand._id}`} className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModel(brand._id, brand.title)} // Pass brand title to showModel function
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteABrand = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrand());
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
          performAction={() => deleteABrand(brandId)}
          title={`Are you sure you want to delete "${brandTitle}" brand?`} // Use brand title in the confirmation message
        />
      </div>
    </div>
  );
};

export default BrandList;
