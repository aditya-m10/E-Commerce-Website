import React, { useState } from 'react';
import { AppBar,Box,Toolbar,Typography,Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./Theme"
import { getToken } from '../services/LocalStorage';
import { FaShoppingCart } from 'react-icons/fa';
import Sidebar from './pages/cart/Cart';
import "./pages/cart/cart.css";

const Navbar = () => {
  const { access_token } = getToken()
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(pre => !pre)
  }
  return (
    <>          

    <ThemeProvider theme={theme}>

<Box sx={{flexGrow:1}}>
    <AppBar style={{ background: 'transparent'}} sx={{ boxShadow: 3}} position='static' color="primary" >
        <Toolbar variant="dense">
            <Typography variant='h5'sx={{color:"green",flexGrow:1,fontWeight: 'bold'}}  >
                AADINAATH<span style={{fontSize:12, mx: 5}} > Sales</span>
            </Typography>
            <Button component={NavLink} to="/" style={({isActive})=>{return {textDecoration: isActive ? 'underline' : ''}}}
            sx={{color:"green", textTransform: 'none'}} end>Home</Button>
            <Button component={NavLink} to="/contact" style={({isActive})=>{return {textDecoration: isActive ? 'underline' : ''}}}
            sx={{color:"green", textTransform: 'none'}}>Contact</Button>
            {access_token ? <Button component={NavLink} to="/dashboard" 
                style={({isActive})=>{return {textDecoration: isActive ? 'underline' : ''}}}
                sx={{color:"green", textTransform: 'none'}}>
                Dashboard
                </Button> : <Button component={NavLink} underline="hover"
                to="/reslogin" 
                style={({isActive})=>{return {textDecoration: isActive ? 'underline' : ''}}}
                sx={{color:"green", textTransform: 'none'}}>Login/Registration</Button>}     
            <Button  onClick={handleToggle}
            sx={{color:"green", textTransform: 'none'}} end><FaShoppingCart  size={20} /> </Button>   
                 {toggle && <Sidebar close={() => setToggle(false)} />}


        </Toolbar>
    </AppBar>
</Box>
</ThemeProvider>

 </>
  )
}

export default Navbar;
