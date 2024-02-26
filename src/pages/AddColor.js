import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getColor,
  createColor,
  getColorById,
  updateColor,
  resetState,
} from "../features/color/colorSlice";

import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isLoading,
    isError,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    dispatch(getColor());
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully", {});
      navigate("/admin/list-color");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully", {});
      navigate("/admin/list-color"); // Redirect to the list-brand page
    }

    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        await dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {}, 300);
      }
    },
  });

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColorById(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (colorName) {
      formik.setValues({ title: colorName }); // Prepopulate form with brandName
    }
  }, [colorName]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Edit" : "Add"}
        Color
      </h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div>
            <CusotomInput
              type="color"
              label="Enter Color"
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
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
