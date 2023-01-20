import * as React from 'react';
import {Button,Link,Typography,Toolbar,Box,AppBar,useMediaQuery,useTheme} from '@mui/material/';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../../../features/authSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import {  NavLink, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../../services/LocalStorage';
import { useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../../../features/userSlice';
import { useEffect } from 'react';
import { useGetDataUserQuery } from '../../../services/Authenticationapi';
import DrawerComp from "./Drawer";
import {  useSelector } from "react-redux";


const DashNav = () => { 
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const navigate=useNavigate();
  const  handleLogout=()=>{
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
   
    navigate("/reslogin")
  
    
  }
  const { data, isSuccess } = useGetDataUserQuery(access_token)

  const [userData, setUserData] = useState({
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        name: data.name,
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        name: data.name
      }))
    }
  }, [data, isSuccess, dispatch])

  return (
    <>
    <ThemeProvider theme={theme}>

    <Box sx={{flexGrow:1}}>
    <AppBar style={{ backgroundColor: 'white', boxShadow: 3}} position='static' color="primary" >
        <Toolbar variant="dense"  >
            <Typography  variant='h5'sx={{color:"green",flexGrow:1,fontWeight: 'bold'}}  >
            <a style={{cursor: 'pointer'}} onClick={()=>navigate("/")}>AADINAATH<span style={{ fontSize: 12, mx: 5 }}> Sales</span></a>
            
            </Typography>
            <Typography variant='h3'style={{fontSize:14}} sx={{mr: 2,color:"green",fontWeight: 'bold'}}  >
            Welcome, {userData.name}
            </Typography>
            {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) :<>
           {cart.length > 0 ?<Button
                component={NavLink}
                to="/dash/checkout"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
                end
              >
                My Cart
              </Button>:""}
             <Button
                component={NavLink}
                to="/dash"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
                end
              >
                My Orders
              </Button>
              
              <Button
                component={NavLink}
                to="/dash/addproduct"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
                end
              >
                My Products
              </Button>
              <Button component={NavLink}
                to="/dash/reset"
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "" };
                }}
                sx={{ color: "green", textTransform: "none" }}
                end>Change password </Button></>}
           
           
            <Button   onClick={handleLogout}variant="contained" color="success" style={{color:"wgite",  fontSize: 12,borderRadius: 5}}>
              LogOut
              </Button>
              

        </Toolbar>
    </AppBar>
</Box>   
</ThemeProvider >

    

    </>
  );
};
export default DashNav;
