import { Button, Box, Container } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import { CustomersTable } from "src/sections/customer/customers-table";
import { SellersTable } from "src/sections/customer/seller-table";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const [activeTable, setActiveTable] = useState("customers");

  const handleButtonClick = (tableType) => {
    setActiveTable(tableType);
  };

  return (
    <div>
      <Head>
        <title>Users | SmartBakers</title>
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
          crossorigin="anonymous"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div
            style={{
              display: "flex ",
              gap: "15px",
              borderBottom: "1px solid gray",
              marginBottom: "-27px",
            }}
          >
            <span
              style={{
                borderBottom: activeTable === "customers" ? "2px solid " : "",
                padding: "10px",
                cursor: "pointer",
              }}
              variant="outlined"
              size="medium"
              onClick={() => handleButtonClick("customers")}
            >
              Customer
            </span>
            <span
              variant="outlined"
              size="medium"
              onClick={() => handleButtonClick("sellers")}
              style={{
                cursor: "pointer",
                borderBottom: activeTable === "sellers" ? "2px solid " : "",
                padding: "10px",
              }}
            >
              Seller
            </span>
          </div>
        </Container>
      </Box>
      <div>
        {activeTable === "customers" ? <CustomersTable /> : null}
        {activeTable === "sellers" ? <SellersTable /> : null}
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
