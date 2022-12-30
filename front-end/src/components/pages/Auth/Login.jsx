import React,{useState} from "react";
import { Box,Link,Dialog,Typography } from "@mui/material";
import Registration from './Registration';
import Authlogin from './Authpage';

const Login=()=>{
    const [openRegister, setOpenRegister] = useState(false);    
  
    const handleClose = () => {
      setOpenRegister(false);

    };      
    return (
        <>
        
         <Box sx={{mt: 2 , mx: 5 }}>

        <Authlogin />
        <Typography variant="body1" sx={{mx:5}}>Don't have account?<Link   onClick={()=>setOpenRegister(true)} href="#" underline="always">Create Account </Link></Typography>
          <Dialog  fullWidth open={openRegister} onClose={handleClose}>  
            <Registration />              
          </Dialog>   
        </Box>
             
       
        
        </>
    )
}

export default Login;