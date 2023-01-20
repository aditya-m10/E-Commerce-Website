import React, { useState,useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, useMediaQuery,
  useTheme, } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getToken } from "../services/LocalStorage";
import Sidebar from "./pages/cart/Cart";
import "./pages/cart/cart.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {  useSelector } from "react-redux";
import { cartTotalSelector } from "../features/selectors";
import DrawerComp from "./pages/home/Drawer";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const { access_token } = getToken();
  const [toggle, setToggle] = useState(false);
  const total = useSelector(cartTotalSelector);
  const [change, setChange] = useState(false);
  const navigate=useNavigate();


  useEffect(() => {
    if (total !== 0) {
      setChange(true);

      setTimeout(() => {
        setChange(false);
      }, 1000);
    }
  }, [total]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }} >
          <AppBar
            style={{ backgroundColor: "#fff" }}
            sx={{ boxShadow: 3 }}
            position= "fixed"
            color="primary"
          >
            <Toolbar variant="dense">
              <Typography 
                variant="h5"
                sx={{ color: "green", flexGrow: 1, fontWeight: "bold" }}
              >
                <a style={{cursor: 'pointer'}}  onClick={()=>navigate("/")}>AADINAATH<span style={{ fontSize: 12, mx: 5 }}> Sales</span></a>
              </Typography>
              {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (<><Button
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
                  to="/dash"
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
              )}</>)}
              <IconButton
                onClick={()=>setToggle(!toggle)}
                sx={{ color: "green", textTransform: "none" }}
                aria-label="cart"
              >
                <StyledBadge change={change} badgeContent={total} color="secondary">
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
