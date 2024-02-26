import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  getCoupen,
  deleteCoupen,
  resetState,
} from "../features/coupen/coupenSlice";
import CustomModel from "../component/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount.length - b.discount.length,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const CoupenList = () => {
  const [open, setOpen] = useState(false);
  const [coupenId, setCoupenId] = useState("");
  const [coupenTitle, setCoupenTitle] = useState(""); // Add state to store brand title

  const showModel = (coupenId, coupenTitle) => {
    setOpen(true);
    setCoupenId(coupenId);
    setCoupenTitle(coupenTitle); // Set the brand title when the delete button is clicked
  };

  const hideModel = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupen());
  }, [getCoupen]);
  const coupenState = useSelector((state) => state.coupen.coupens.data);

  const data1 = Array.isArray(coupenState)
    ? coupenState.map((coupen, index) => ({
        key: index + 1,
        title: coupen.name,
        expiry: new Date(coupen.expiry).toLocaleString(),
        discount: coupen.discount,
        action: (
          <div>
            <Link
              to={`/admin/add-coupen/${coupen._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModel(coupen._id, coupen.name)}
            >
              <AiFillDelete />{" "}
            </button>
          </div>
        ),
      }))
    : [];

  const deleteACoupen = (e) => {
    dispatch(deleteCoupen(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupen());
    }, 1000);
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4 title">Coupen List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          hideModel={hideModel}
          open={open}
          performAction={() => deleteACoupen(coupenId)}
          title={`Are you sure you want to delete "${coupenTitle}" Coupen?`}
        />
      </div>
    </div>
  );
};

export default CoupenList;
