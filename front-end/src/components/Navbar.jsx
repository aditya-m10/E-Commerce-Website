import React, { useState,useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, useMediaQuery,
  useTheme, } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getToken } from "../services/LocalStorage";
import Sidebar from "./pages/cart/Cart";
import "./pages/cart/cart.css";
import "./App.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {  useSelector } from "react-redux";
import { cartTotalSelector } from "../features/selectors";
import DrawerComp from "./pages/home/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles({
  title1: {
    color:"#FF9F29",
    fontSize:40,
    fontFamily:"cursive",
    fontWeight:600
  },
  title2: {
    color:"#000000",
    fontSize:40,
    fontFamily:"cursive",
    fontWeight:600
  },
  button:{
    color:"#000000", 
    fontSize:18, 
    textTransform: "none" ,
    fontWeight:600 ,
    fontFamily:"cursive"
  }
  
})
 
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  const classes = useStyles();

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
            style={{ backgroundColor: "#fff" ,height:"60px"}}
           
            position= "fixed"
          >
            <Toolbar variant="dense">
              <div className="navtitle"  >
              
              <Typography className={classes.title1} onClick={()=>navigate("/")} style={{cursor: 'pointer'}} variant="h5"   >Bargain </Typography>
              <Typography className={classes.title2} onClick={()=>navigate("/")} style={{cursor: 'pointer'}}  variant="h5" >Kart</Typography>
              </div>
              {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (<div ><Button
                component={NavLink}
                to="/"
                style={({ isActive }) => {
                  return { color: isActive ? "#FF9F29" : "" };
                }}
                className={classes.button}                

                end
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/contact"
                style={({ isActive }) => {
                  return { color: isActive ? "#FF9F29" : "" };
                }}
                className={classes.button}                
              >
                Contact
              </Button>
              {access_token ? (
                <Button
                  component={NavLink}
                  to="/dash"
                  style={({ isActive }) => {
                    return { color: isActive ? "#FF9F29" : "" };
                  }}
                  className={classes.button}                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  component={NavLink}
                  underline="hover"
                  to="/reslogin"
                  style={({ isActive }) => {
                    return { color: isActive ? "#FF9F29" : "" };
                  }}
                  className={classes.button}                
                >
                  Login/Registration
                </Button>
              )}</div>)}
              <IconButton
                onClick={()=>setToggle(!toggle)}
                sx={{ color:"#FF9F29", textTransform: "none" }}
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
