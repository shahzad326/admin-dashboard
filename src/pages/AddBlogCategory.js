import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createBlogCategory,
  getBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
  resetState,
} from "../features/blog-category/blogCategorySlice";

import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Cateogory is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCategoryId = location.pathname.split("/")[3];
  // console.log(getBlogCategoryId);

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    blogCategoryName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    dispatch(getBlogCategory());
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully", {});
      navigate("/admin/blog-category-list");
    }

    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully", {});
      navigate("/admin/blog-category-list");
    }

    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getBlogCategoryId !== undefined) {
        const data = { id: getBlogCategoryId, blogCategoryData: values };
        await dispatch(updateBlogCategory(data)); // Wait for updateBrand action to complete
        dispatch(resetState()); // Reset the state after updateBrand action is completed
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {}, 300);
      }
    },
  });

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getBlogCategoryById(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId]);

  useEffect(() => {
    if (blogCategoryName) {
      formik.setValues({ title: blogCategoryName }); // Prepopulate form with brandName
    }
  }, [blogCategoryName]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCategoryId !== undefined ? "Edit" : "Add"}
        Blog Category
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
              label="Enter Blog Catetgory Title"
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
            {getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
