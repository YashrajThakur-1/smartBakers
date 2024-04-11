import PropTypes from "prop-types";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
// import OrderDetail from "./view-orderDetail";
export const CompanyOrder = (props) => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedData, setEditedData] = useState({
    products_name: "",
    user_name: "",
    user_email: "",
    product_price: "",
    quantity: "",
    paymentStatus: "",
    orderStatus: "",
    product_image_url: "",
  });
  const handleCustomerClick = (customer) => {
    console.log(customer);
    setSelectedCustomer(customer);
    setEditedData({
      products_name: customer.products_name,
      user_name: customer.user_name,
      user_email: customer.user_email,
      product_price: customer.product_price,
      quantity: customer.quantity,
      paymentStatus: customer.paymentStatus,
      orderStatus: customer.orderStatus,
      product_image_url: customer.product_image_url,
    });
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  const [searchword, setSearchWord] = useState("");
  const fetchData = () => {
    axios
      .get("https://srv416214.hstgr.cloud/order")
      .then((res) => {
        const modifiedData = res.data.map((item) => ({
          ...item,
          products_name: item.products_name.replace(/[\\[\]\"]/g, ""),
          product_price: item.product_price.replace(/[\\[\]\"]/g, ""),
          quantity: item.quantity.replace(/[\[\]"]/g, ""),
          // product_image_url: item.product_image_url.replace(/\"[\\\"\\\"]\"/g, ""),
        }));
        setData(modifiedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const filteredCoins = data.filter((coin) => {
    return coin.products_name.toLowerCase().includes(searchword.toLowerCase());
  });
  const orderStatus = "delivered";

  const changeOrderStatus = async (user_id) => {
    try {
      const newData = {
        user_id,
        orderStatus,
      };

      const response = await axios.put("https://srv416214.hstgr.cloud/updateOrderStatus", newData);
      toast.success(response.data.message);
      fetchData();
      // You can perform further actions, update UI, etc. here
    } catch (error) {
      console.error(error);
    }
  };
  // const handleFormSubmit = useCallback(() => {
  //   axios
  //     .put("https://srv416214.hstgr.cloud/updateOrderStatus", editedData)
  //     .then((response) => {
  //       console.log("Update successful:", response.data.message);
  //       toast.success(response?.data.message);
  //       handleCloseDialog();
  //     })
  //     .catch((error) => {
  //       console.error("Update failed:", error);
  //     });
  // }, [editedData]);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Order"
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </Card>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800, maxHeight: "80vh", overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Customer Email</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>ProductStatus</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Check Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((customer) => {
                  const isSelected = selected.includes(customer.user_id);
                  return (
                    <TableRow hover key={customer.user_id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.user_id);
                            } else {
                              onDeselectOne?.(customer.user_id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar
                            src={`https://srv416214.hstgr.cloud/uploads/${customer.image_url}`}
                          >
                            {getInitials(customer.name)}
                          </Avatar>
                          <Typography
                            variant="subtitle2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleCustomerClick(customer)}
                          >
                            {customer.products_name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{customer.user_name}</TableCell>
                      <TableCell>{customer.user_email}</TableCell>
                      <TableCell>{customer.product_price}</TableCell>
                      <TableCell>{customer.quantity}</TableCell>
                      <TableCell>{customer.paymentStatus}</TableCell>
                      <TableCell>{customer.orderStatus}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => changeOrderStatus(customer.user_id)}
                        >
                          CheckIt
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Toaster position="top-center" reverseOrder={false} />
      {/* {selectedCustomer && (
        <OrderDetail
          open={isDialogOpen}
          onClose={handleCloseDialog}
          editData={editedData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )} */}
    </>
  );
};

CompanyOrder.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
