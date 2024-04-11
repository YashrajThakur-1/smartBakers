import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, InputAdornment, OutlinedInput, Button, FormHelperText } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const validationSchema = Yup.object({
  seller_name: Yup.string().required("Name is required"),
  seller_email: Yup.string().email("Invalid email address").required("Email is required"),
  seller_phoneno: Yup.string().required("Phone No is required"),
  seller_location: Yup.string().required("Location is required"),
  seller_city: Yup.string().required("City is required"),
});
const AddSeller = () => {
  const formik = useFormik({
    initialValues: {
      seller_name: "",
      seller_email: "",
      seller_phoneno: "",
      seller_location: "",
      seller_city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://srv416214.hstgr.cloud/seller", values);
        console.log("response", response);
        toast.success(response?.data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    },
  });
  return (
    <>
      <div class="row row-cols-1 row-cols-md-5 g-4 " sx={{ marginTop: 20 }}>
        <div class="col">
          <OutlinedInput
            defaultValue=""
            placeholder="Enter Name"
            onChange={formik.handleChange}
            name="seller_name"
            value={formik.values.seller_name}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            sx={{ maxWidth: "auto" }}
          />
          <FormHelperText error>
            {formik.touched.seller_name && formik.errors.seller_name}
          </FormHelperText>
        </div>
        <div class="col">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Enter Email"
            onChange={formik.handleChange}
            name="seller_email"
            value={formik.values.email}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            sx={{ maxWidth: "auto" }}
          />
          <FormHelperText error>
            {formik.touched.seller_email && formik.errors.seller_email}
          </FormHelperText>
        </div>
        <div class="col">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Enter PhoneNo"
            onChange={formik.handleChange}
            name="seller_phoneno"
            value={formik.seller_phoneno}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            sx={{ maxWidth: "auto" }}
          />
          <FormHelperText error>
            {formik.touched.seller_phoneno && formik.errors.seller_phoneno}
          </FormHelperText>
        </div>
        <div class="col">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Enter Location"
            onChange={formik.handleChange}
            name="seller_location"
            value={formik.seller_location}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            sx={{ maxWidth: "auto" }}
          />
          <FormHelperText error>
            {formik.touched.seller_location && formik.errors.seller_location}
          </FormHelperText>
        </div>
        <div class="col">
          <OutlinedInput
            placeholder="City"
            onChange={formik.handleChange}
            name="seller_city"
            value={formik.seller_city}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            sx={{ maxWidth: "auto" }}
          />
          <FormHelperText error>
            {formik.touched.seller_city && formik.errors.seller_city}
          </FormHelperText>
        </div>

        <div class="col">
          <Button sx={{ marginTop: 1 }} variant="contained" onClick={formik.handleSubmit}>
            Add User
          </Button>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </>
  );
};

export default AddSeller;
