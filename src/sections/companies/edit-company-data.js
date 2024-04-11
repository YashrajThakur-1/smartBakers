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

export default function CustomizedDialogs({
  open,
  onClose,
  editData,
  onFormSubmit,
  onInputChange,
}) {
  console.log("Edit Data", editData);
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Product Detail
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
                : `https://srv416214.hstgr.cloud/uploads/${editData?.image_url}`
            }
            alt=""
          />
        </Card>
        <TextField
          sx={{
            marginBottom: ["10px", "20px"],
          }}
          label="Name"
          fullWidth
          name="name"
          value={editData == undefined ? "" : editData?.name}
          onChange={onInputChange}
        />
        <TextField
          sx={{
            marginBottom: ["10px", "20px"],
          }}
          label="Price"
          fullWidth
          name="price"
          value={editData == undefined ? "" : editData?.price}
          onChange={onInputChange}
        />
        <TextField
          sx={{
            marginBottom: ["10px", "20px"],
          }}
          label="Sell Price"
          fullWidth
          name="sell_price"
          value={editData == undefined ? "" : editData?.sell_price}
          onChange={onInputChange}
        />
        <TextField
          sx={{
            marginBottom: ["10px", "20px"],
          }}
          label="ProductStatus"
          fullWidth
          name="productStatus"
          value={editData == undefined ? "" : editData?.productStatus}
          onChange={onInputChange}
        />
        <TextField
          sx={{
            marginBottom: ["10px", "20px"],
          }}
          label="Stock"
          fullWidth
          name="stock"
          value={editData == undefined ? "" : editData?.stock}
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
  );
}

{
  /* {selectedCustomer && (
        <OrderDetail
          open={isDialogOpen}
          onClose={handleCloseDialog}
          editData={editedData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )} */
}
