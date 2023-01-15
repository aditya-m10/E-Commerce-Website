import {   useNavigate } from 'react-router-dom';
import React,{useEffect, useState} from "react";
import { Typography,TextField,Button,Box,Link,Alert,Dialog, } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import { useLoginUserMutation } from '../../../services/Authenticationapi';
import Sendmail from './Sendmail';
import { useDispatch } from 'react-redux';

import { setUserToken } from '../../../features/authSlice';
import { getToken, storeToken } from '../../../services/LocalStorage';
const Authlogin=()=>{
    const [openForget, setOpenForget] = useState(false);
    const dispatch = useDispatch()

    const handleClick = () => {
        setOpenForget(true);
  
      };
  
    const handleClose = () => {
      setOpenForget(false);

    };


 

    const navigate=useNavigate()
    const [serverError,setServerError]=useState({})
    const [loginUser] = useLoginUserMutation();
    
    
    
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        e.stopPropagation()
        const data= new FormData(e.currentTarget);
        const actualData={
            email: data.get('email'),
            password: data.get('password'),
        }
      console.log(data)
      const res = await loginUser(actualData)
      if (res.error) {
        setServerError(res.error.data.errors)
      }
      if(res.data){
        storeToken(res.data.token)
        let { access_token } = getToken()
        dispatch(setUserToken({ access_token: access_token }))
        navigate('/dash/checkout')
        }
    }    
    let { access_token } = getToken()
    useEffect(() => {
      dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])   
    return (
        <>
        <ThemeProvider theme={theme}>
        <Box  onSubmit={handleSubmit} component='form' noValidate sx={{mt: 2 , mx: 5 }} id="login-form">
        <TextField   autoComplete='off' margin="normal" required fullWidth id="email" name="email" label="Email"/>
        {serverError.email ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.email[0]}</Typography> : ""}
        <TextField   autoComplete='off'margin="normal" type="password" required fullWidth id="password" name="password" label="Password"/>
        {serverError.password ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.password[0]}</Typography> : ""}
        <Box   display="flex"  justifyContent="flex-end"  alignItems="flex-end"  >
        <Link onClick={handleClick} style={{fontSize: 14}} href="#" underline="always">Forget password?</Link></Box>
        <Dialog open={openForget} onClose={handleClose}>
        <Sendmail />
        </Dialog>
        {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors[0]}</Alert> : ''}
        <Box >
        <Button type="submit" style={{ borderRadius: 25,fontSize: 12 }} variant="contained" color="primary"  sx={{mt: 2 ,color: "white" }} >
          Login
        </Button><br /><br />
                
       
        </Box>
        
        </Box>
        </ThemeProvider >

        </>
    )
}

export default Authlogin;