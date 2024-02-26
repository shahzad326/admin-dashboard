import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBrand,
  getBrand,
  getBrandById,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand title is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  // console.log(getBrandId);
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    dispatch(getBrand());
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully", {});
      navigate("/admin/list-brand"); // Redirect to the list-brand page
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully", {});
      navigate("/admin/list-brand"); // Redirect to the list-brand page
    }
    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        await dispatch(updateBrand(data)); // Wait for updateBrand action to complete
        dispatch(resetState()); // Reset the state after updateBrand action is completed
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {}, 300);
      }
    },
  });

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrandById(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (brandName) {
      formik.setValues({ title: brandName }); // Prepopulate form with brandName
    }
  }, [brandName]);

  return (
    <div>
      <h3 className="mb-4 title">
        {" "}
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
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
              label="Enter Brand Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
