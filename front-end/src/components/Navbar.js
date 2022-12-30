import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { getToken } from "../services/LocalStorage";
import Sidebar from "./pages/cart/Cart";
import "./pages/cart/cart.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  const { access_token } = getToken();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((pre) => !pre);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            style={{ background: "transparent" }}
            sx={{ boxShadow: 3 }}
            position="static"
            color="primary"
          >
            <Toolbar variant="dense">
              <Typography
                variant="h5"
                sx={{ color: "green", flexGrow: 1, fontWeight: "bold" }}
              >
                AADINAATH<span style={{ fontSize: 12, mx: 5 }}> Sales</span>
              </Typography>
              <Button
                component={NavLink}
                to="/"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
                end
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/contact"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
              >
                Contact
              </Button>
              {access_token ? (
                <Button
                  component={NavLink}
                  to="/dashboard"
                  style={({ isActive }) => {
                    return { textDecoration: isActive ? "underline" : "" };
                  }}
                  sx={{ color: "green", textTransform: "none" }}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  component={NavLink}
                  underline="hover"
                  to="/reslogin"
                  style={({ isActive }) => {
                    return { textDecoration: isActive ? "underline" : "" };
                  }}
                  sx={{ color: "green", textTransform: "none" }}
                >
                  Login/Registration
                </Button>
              )}
              <IconButton
                onClick={handleToggle}
                sx={{ color: "green", textTransform: "none" }}
                aria-label="cart"
              >
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              {toggle && <Sidebar close={() => setToggle(false)} />}
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
