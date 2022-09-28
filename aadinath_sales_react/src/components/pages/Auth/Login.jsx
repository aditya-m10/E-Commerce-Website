import React,{useState} from "react";
import { Box,Link,Dialog, } from "@mui/material";
import Registration from './Registration';
import Authlogin from './Auhpage';

const Login=()=>{
    const [openRegister, setOpenRegister] = useState(false);

    
  
    const handleClose = () => {
      setOpenRegister(false);

    };      
    return (
        <>
        
         <Box sx={{mt: 2 , mx: 5 }}>

        <Authlogin />
        Don't have account?<Link   onClick={()=>setOpenRegister(true)} href="#" underline="always">Create Account </Link><br />
          <Dialog  fullWidth open={openRegister} onClose={handleClose}>  
            <Registration />              
          </Dialog>   
        </Box>
             
       
        
        </>
    )
}

export default Login;