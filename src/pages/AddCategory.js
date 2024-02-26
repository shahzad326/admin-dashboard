import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProductCategory,
  getProductCategoryById,
  resetState,
  updateProductCategory,
} from "../features/p-category/pcategorySlice";
import { createProductCategory } from "../features/p-category/pcategorySlice";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Product Category title is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getproductcategoryId = location.pathname.split("/")[3];
  // console.log(getproductcategoryId);

  const newProductCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdPCategory,
    pCategoryName,
    updatedPCategory,
  } = newProductCategory;

  useEffect(() => {
    dispatch(getProductCategory());
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && createdPCategory) {
      toast.success("Product Cateogory Added Successfully", {});
      navigate("/admin/list-category");
    }
    if (isSuccess && updatedPCategory) {
      toast.success("Product Cateogory Updated Successfully", {});
      navigate("/admin/list-category");
    }

    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getproductcategoryId !== undefined) {
      dispatch(getProductCategoryById(getproductcategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getproductcategoryId]);

  useEffect(() => {
    if (pCategoryName) {
      formik.setValues({ title: pCategoryName }); // Prepopulate form with brandName
    }
  }, [pCategoryName]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getproductcategoryId !== undefined) {
        const data = { id: getproductcategoryId, productCategoryData: values };
        await dispatch(updateProductCategory(data)); // Wait for updateBrand action to complete
        dispatch(resetState()); // Reset the state after updateBrand action is completed
      } else {
        dispatch(createProductCategory(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {}, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getproductcategoryId !== undefined ? "Edit" : "Add"}
        Product Category
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
              label="Enter Product Category"
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
            {getproductcategoryId !== undefined ? "Edit" : "Add"} Product
            Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
