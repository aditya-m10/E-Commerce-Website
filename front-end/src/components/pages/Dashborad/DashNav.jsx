import * as React from 'react';
import {Button,Link,Typography,Toolbar,Box,AppBar} from '@mui/material/';
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


const DashNav = () => { 
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
            {access_token?
            <>
            <Typography variant='h3'style={{fontSize:14}} sx={{mr: 2,color:"green",fontWeight: 'bold'}}  >
            Welcome, {userData.name}
            </Typography>
            
            <Button   onClick={handleLogout}variant="contained" style={{color:"white",  fontSize: 12,borderRadius: 5}}>
              LogOut
              </Button>
              <Box sx={{mx:2 }} >
            <Link  component={NavLink} to="/dash/reset" style={{fontSize: 14}}  underline="hover">Change password </Link>
            </Box></> : <Button   onClick={()=>navigate("/reslogin")}variant="contained" style={{color:"white",  fontSize: 12,borderRadius: 5}}>
              Login
              </Button>}

        </Toolbar>
    </AppBar>
</Box>   
</ThemeProvider >

    

    </>
  );
};
export default DashNav;
