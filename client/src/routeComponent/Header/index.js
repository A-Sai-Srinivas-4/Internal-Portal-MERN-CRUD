import * as React from "react";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./index.css";

const Header = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  return (
    <nav className="nav_container">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://secureservercdn.net/160.153.137.91/nhd.f13.myftpupload.com/wp-content/uploads/2022/06/logo-1-14.svg?time=1665549221"
            alt="website logo"
          />
        </Link>
        <Stack spacing={2} direction="row">
          <Button
            href="/"
            variant="text"
            sx={{
              color: "black",
              fontSize: "18px",
              fontFamily: "roboto",
              fontWeight: "600",
            }}
          >
            Home
          </Button>
          <Button
            href="/projects"
            variant="text"
            sx={{
              color: "black",
              fontSize: "18px",
              fontFamily: "roboto",
              fontWeight: "600",
            }}
          >
            Projects
          </Button>
          <Button
            href="/developers"
            variant="text"
            sx={{
              color: "black",
              fontSize: "18px",
              fontFamily: "roboto",
              fontWeight: "600",
            }}
          >
            Developers
          </Button>
          <Button
            href="/about"
            variant="text"
            sx={{
              color: "black",
              fontSize: "18px",
              fontFamily: "roboto",
              fontWeight: "600",
            }}
          >
            About
          </Button>
          <Button
            href="/contact"
            variant="text"
            sx={{
              color: "black",
              fontSize: "18px",
              fontFamily: "roboto",
              fontWeight: "600",
            }}
          >
            Contact
          </Button>
        </Stack>
        <div className="profile-log-out-container">
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              ></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                  color="default"
                />
              }
              label={auth ? "Logout" : "Login"}
            />
          </FormGroup>
        </div>
      </div>
    </nav>
  );
};

export default Header;
