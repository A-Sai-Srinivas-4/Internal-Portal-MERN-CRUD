import React from "react";
import SplitBasic from "../SplitButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Sidebar.css";

const GetSidebar = () => (
  <div className="side-bar-container">
    <div className="options-container">
      <Stack spacing={2} direction="column">
        <Button href="/" variant="text">
          Home
        </Button>

        <SplitBasic />

        <Button href="/developers" variant="text">
          Developers
        </Button>
        <Button variant="text">Support</Button>
      </Stack>
    </div>
  </div>
);

export default GetSidebar;
