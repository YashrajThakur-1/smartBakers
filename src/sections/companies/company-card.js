import PropTypes from "prop-types";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import CustomizedDialogs from "./edit-company-data";
export const CompanyCard = (props) => {
  const [data, setData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    price: "",
    sell_price: "",
    productStatus: "",
    stock: "",
    image_url: "",
  });

  const handleCustomerClick = (customer) => {
    console.log(customer);
    setSelectedCustomer(customer);
    setEditedData({
      name: customer.name,
      price: customer.price,
      sell_price: customer.sell_price,
      productStatus: customer.productStatus,
      stock: customer.stock,
      image_url: customer.image_url,
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

  const handleFormSubmit = useCallback(() => {
    axios
      .put("https://srv416214.hstgr.cloud/updateOrderStatus", editedData)
      .then((response) => {
        console.log("Update successful:", response.data.message);
        toast.success(response?.data.message);
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  }, [editedData]);
  const fetchData = () => {
    axios
      .get("https://srv416214.hstgr.cloud/add-product")
      .then((res) => setData(res.data))
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
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  console.log(filteredCoins);
  return (
    <div>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Products"
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
          <Box sx={{ minWidth: 800 }}>
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
                  <TableCell>Price</TableCell>
                  <TableCell>SellPrice</TableCell>
                  <TableCell>ProductStatus</TableCell>
                  <TableCell>stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((customer) => {
                  const isSelected = selected.includes(customer.id);

                  return (
                    <TableRow hover key={customer.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
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
                            {customer.name}
                            <CustomizedDialogs />
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.price}</TableCell>
                      <TableCell>{customer.sell_price}</TableCell>
                      <TableCell>{customer.productStatus}</TableCell>
                      <TableCell>{customer.stock}</TableCell>
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
      <Toaster position="top-center" reverseOrder={false} />;
      {selectedCustomer && (
        <CustomizedDialogs
          open={isDialogOpen}
          onClose={handleCloseDialog}
          editData={editedData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

CompanyCard.propTypes = {
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
