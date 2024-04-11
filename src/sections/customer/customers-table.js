import PropTypes from "prop-types";
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
  Button,
  SvgIcon,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useEffect, useState } from "react";
import axios from "axios";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { CustomersSearch } from "./customers-search";
import AddCustomer from "./addcustomer";
import { Container } from "@mui/system";

export const CustomersTable = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [deleted, setdeleted] = useState([]);
  const [newUser, setNewUser] = useState();
  const [message, setMessage] = useState("");
  const fetchData = () => {
    axios
      .get("https://srv416214.hstgr.cloud/register")
      .then((res) => {
        setData(res.data);
        console.log("res?.data", res?.data);
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

  const deleteUser = async (id) => {
    fetch(`https://srv416214.hstgr.cloud/users/${id}`, {
      method: "DELETE",
    });
    setdeleted(data.filter((user) => user?.id !== id))
      .then((data) => {
        setdeleted(data.success);
        if (data?.success) {
          console.log(deleted);
          console.log("User account deleted successfully");
        } else {
          console.log("Failed to delete user account");
        }
      })
      .catch((error) => {
        console.error("Something went wrong");
        console.error(error);
        console.log(deleted);
      });
  };

  const AproveUser = async (userId) => {
    try {
      const response = await fetch(`https://srv416214.hstgr.cloud/users/${userId}/approve`, {
        method: "PUT",
      });
      setNewUser(data.filter((user) => user.id !== userId));
      if (response.ok) {
        setMessage("User approved successfully.");
      } else {
        setMessage("Error approving user.");
      }
    } catch (error) {
      console.error("Error approving user: ", error);
      setMessage("Error approving user.");
    }
    uploadUser();
  };

  const uploadUser = () => {
    if (!newUser) {
      alert("user not verifed");
    } else {
      axios
        .post("https://srv416214.hstgr.cloud/verifyuser", newUser)
        .then((res) => console.log("User Add Aproved Table "))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <customerData />
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                onClick={() => setShow(!show)}
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          {show && (
            <div>
              <AddCustomer />
            </div>
          )}

          <CustomersSearch />
        </Stack>
      </Container>
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
                  <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>View Details</TableCell>
                  <TableCell>Approve</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((customer) => {
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
                          <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.phoneno}</TableCell>
                      <TableCell>
                        <button onClick={() => alert("Check")}>View Details</button>
                      </TableCell>
                      <TableCell>
                        <button onClick={() => AproveUser(customer.id)}>Approve</button>
                      </TableCell>
                      <TableCell>
                        <button onClick={() => alert("data Deleted")}>Delete</button>
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
    </>
  );
};

CustomersTable.propTypes = {
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
