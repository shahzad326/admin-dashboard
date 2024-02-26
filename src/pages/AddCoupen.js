import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createCoupen,
  getCoupen,
  getCoupenById,
  resetState,
  updateCoupen,
} from "../features/coupen/coupenSlice";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupen name is required"),
  expiry: Yup.date().required("Coupen Expiry is required"),
});

const AddCoupen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCoupenId = location.pathname.split("/")[3];
  // console.log(getCoupenId);

  const newCoupen = useSelector((state) => state.coupen);
  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupen,
    coupenname,
    coupenexpiry,
    coupendiscount,
  } = newCoupen;

  const changeDataFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [month, day, year].join("/");
  };

  console.log(changeDataFormat(coupenexpiry));
  useEffect(() => {
    dispatch(getCoupen());
    dispatch(resetState());
  }, [getCoupen]);
  useEffect(() => {
    if (isSuccess && createdCoupen) {
      toast.success("Coupen Added Successfully", {});
      navigate("/admin/list-coupen");
    }

    if (isSuccess && coupenname && coupenexpiry && coupendiscount) {
      toast.success("Coupen Updated Successfully", {});
      navigate("/admin/list-coupen");
    }
    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: coupenname || "",
      expiry: changeDataFormat(coupenexpiry) || "",
      discount: coupendiscount || "",
    },

    validationSchema: schema,
    onSubmit: async (values) => {
      if (getCoupenId !== undefined) {
        const data = { id: getCoupenId, coupenData: values };
        await dispatch(updateCoupen(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupen(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {}, 300);
      }
    },
  });

  useEffect(() => {
    if (getCoupenId !== undefined) {
      dispatch(getCoupenById(getCoupenId));
    } else {
      dispatch(resetState());
    }
  }, [getCoupenId]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getCoupenId !== undefined ? "Edit" : "Add"}
        Coupen
      </h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div>
            <CusotomInput
              type="text"
              label="Enter Coupen Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div>
            <CusotomInput
              type="date"
              label="Enter Coupen Expiry Date"
              name="expiry"
              value={formik.values.expiry}
              onChange={formik.handleChange("expiry")}
              onBlur={formik.handleBlur("expiry")}
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>
          <div>
            <CusotomInput
              type="number"
              label="Enter Coupen Discount"
              name="name"
              value={formik.values.discount}
              onChange={formik.handleChange("discount")}
              onBlur={formik.handleBlur("discount")}
            />
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCoupenId !== undefined ? "Edit" : "Add"}
            Coupen
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupen;
