import { useState, useEffect } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button } from "@mui/material";
import axios from "axios";
const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    sell_price: "",
    productStatus: "",
    stock: "",
    image_url: null,
  });
  const [getData, setGetData] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await axios.post("https://srv416214.hstgr.cloud/upload", formData);
      setProductData({ ...productData, image_url: response.data.imagePath });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://srv416214.hstgr.cloud/add-product", productData);
      alert("Product added successfully.");
      setProductData({
        name: "",
        price: "",
        sell_price: "",
        productStatus: "",
        stock: "",
        image_url: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error during request setup:", error.message);
      }
    }
  };

  const addData = () => {
    try {
      axios
        .get("https://srv416214.hstgr.cloud/get-products")
        .then((res) => setGetData(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    addData();
  }, []);

  return (
    <>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Enter Product Name"
              onChange={handleInputChange}
              name="name"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Enter Product Price"
              onChange={handleInputChange}
              name="price"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Enter Product Sell Price"
              onChange={handleInputChange}
              name="sell_price"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Enter Product Status"
              onChange={handleInputChange}
              name="productStatus"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4 ">
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              onChange={handleInputChange}
              placeholder="Enter Product Stock"
              name="stock"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>
        <div class="col">
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              sx={{ maxWidth: "auto" }}
            />
          </Card>
        </div>

        <div class="col">
          <Button variant="contained" sx={{ margin: 3 }} onClick={handleSubmit}>
            Add Product
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
