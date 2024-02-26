import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getColor,
  deleteColor,
  resetState,
} from "../features/color/colorSlice";
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
const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const [colorTitle, setColorTitle] = useState(""); // Add state to store brand title

  const showModel = (brandId, brandTitle) => {
    setOpen(true);
    setColorId(brandId);
    setColorTitle(brandTitle); // Set the brand title when the delete button is clicked
  };

  const hideModel = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColor());
  }, []);

  const colorState = useSelector((state) => state.color.colors.data);
  // console.log(colorState);

  const data1 = Array.isArray(colorState)
    ? colorState.map((color, index) => ({
        key: index + 1,
        title: color.title,
        action: (
          <div>
            <Link to={`/admin/color/${color._id}`} className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModel(color._id, color.title)} // Pass brand title to showModel function
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteABrand = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColor());
    }, 1000);
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4 title">Color List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          hideModel={hideModel}
          open={open}
          performAction={() => deleteABrand(colorId)}
          title={`Are you sure you want to delete "${colorTitle}" Color?`}
        />
      </div>
    </div>
  );
};

export default ColorList;
