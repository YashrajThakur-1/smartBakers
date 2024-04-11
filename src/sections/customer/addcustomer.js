import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const AddCustomer = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneno: Yup.string().required("Phone No is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().required("Password is required"),
    selectedRole: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneno: "",
      address: "",
      password: "",
      selectedRole: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addSubmit(values);
    },
  });

  const addSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("https://srv416214.hstgr.cloud/admin-user", data);
      console.log(res?.data);
      if (!res) {
        alert("This user is not added");
      } else {
        alert("User Added");
        formik.resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-md-5 g-4" style={{ marginTop: 20 }}>
          <div className="col">
            <FormControl fullWidth>
              <OutlinedInput
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Name"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
              <FormHelperText error>{formik.touched.name && formik.errors.name}</FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <OutlinedInput
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Email"
                type="email"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
              <FormHelperText error>{formik.touched.email && formik.errors.email}</FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <OutlinedInput
                id="phoneno"
                name="phoneno"
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="phoneno"
                placeholder="Enter Phone No:"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
              <FormHelperText error>
                {formik.touched.phoneno && formik.errors.phoneno}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <OutlinedInput
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="address"
                placeholder="Enter Address"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
              <FormHelperText error>
                {formik.touched.address && formik.errors.address}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <OutlinedInput
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder="Enter Password"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
              <FormHelperText error>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <Select
                id="selectedRole"
                name="selectedRole"
                labelId="demo-simple-select-label"
                value={formik.values.selectedRole}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Select Option"
              >
                <MenuItem value="" selected>
                  Select Option
                </MenuItem>
                <MenuItem value="Product Manager">Product Manager</MenuItem>
                <MenuItem value="Admin Manager">Admin Manager</MenuItem>
              </Select>
              <FormHelperText error>
                {formik.touched.selectedRole && formik.errors.selectedRole}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="col">
            <Button style={{ marginTop: 1 }} variant="contained" type="submit">
              Add User
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCustomer;
