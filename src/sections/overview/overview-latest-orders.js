import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useState, useEffect } from "react";
import axios from "axios";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://srv416214.hstgr.cloud/order")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Email</TableCell>
                <TableCell>TotalPrice</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => {
              
                return (
                  <TableRow hover key={order.user_id}>
                    <TableCell>{order.user_id}</TableCell>
                    <TableCell>{order.user_name}</TableCell>
                    <TableCell>{order.user_email}</TableCell>
                    <TableCell>{order.product_price}</TableCell>
                    <TableCell>
                    {order.product_image_url ? (
                      <Box
                        component="img"
                        src={`https://srv416214.hstgr.cloud/uploads/${order.product_image_url}`}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: "neutral.200",
                          height: 48,
                          width: 48,
                        }}
                      />
                    )}</TableCell>  
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>{order.status}</SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
