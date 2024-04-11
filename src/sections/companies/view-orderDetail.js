import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Card, CardMedia, Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
}));

export default function OrderDetail({ open, onClose, editData, onFormSubmit, onInputChange }) {
  console.log("Edit Data", editData);
  return (
    <>
      <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Order Detail
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Card
            sx={{
              maxWidth: 170,
              margin: "auto",
              marginBottom: "20px",
              resize: "center",
            }}
          >
            <CardMedia
              component="img"
              src={
                editData == undefined
                  ? ""
                  : `https://srv416214.hstgr.cloud/uploads/${editData?.product_image_url}`
              }
              alt=""
            />
          </Card>
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Customer Name"
            fullWidth
            name="products_name"
            value={editData == undefined ? "" : editData?.products_name}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Customer Name"
            fullWidth
            name="user_name"
            value={editData == undefined ? "" : editData?.user_name}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Email"
            fullWidth
            name="user_email"
            value={editData == undefined ? "" : editData?.user_email}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Product Price"
            fullWidth
            name="product_price"
            value={editData == undefined ? "" : editData?.product_price}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Product Quantity"
            fullWidth
            name="quantity"
            value={editData == undefined ? "" : editData?.quantity}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Payment Status"
            fullWidth
            name="paymentStatus"
            value={editData == undefined ? "" : editData?.paymentStatus}
            onChange={onInputChange}
          />
          <TextField
            sx={{
              marginBottom: ["10px", "20px"],
            }}
            label="Order Status"
            fullWidth
            name="orderStatus"
            value={editData == undefined ? "" : editData?.orderStatus}
            onChange={onInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            <Grid item>
              <Button variant="contained" size="medium" onClick={onFormSubmit}>
                Update
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
