import React,{useState} from "react";
import { TextField,Button,Box,Alert,FormControlLabel,Checkbox, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import { useRegisterUserMutation } from '../../../services/Authenticationapi';
const Registration = () => {
    const [serverError,setServerError]=useState({})
    const [server_msg, setServerMsg] = useState({})

    const [registerUser,  ] = useRegisterUserMutation();
   
    const handleSubmit = async (e) => {
      
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data)
        const actualData = { 
          name: data.get('name'),        
          email: data.get('email'),
          password: data.get('password'),
          password2: data.get('password2'),
          tc: data.get('tc'),
          
        }
      const res = await registerUser(actualData)
      if (res.error) {
        setServerMsg({})
        setServerError(res.error.data.errors)
      }
      if(res.data){
        setServerError({})
        setServerMsg(res.data)
        setTimeout(() => {
          window.location.reload(false);
        }, 2000)
      }
    }
  return (
    <>
      <ThemeProvider theme={theme}>

        <Box  onSubmit={handleSubmit} component='form' noValidate sx={{mt: 2 , mx: 5 ,my: 2}} id="registration-form">
        <Typography align="center" sx={{fontSize: 20,color: 'green',fontWeight: 'bold',}} >Registration</Typography>
        <TextField  autoFocus  variant="standard" autoComplete='off' margin="normal" fullWidth required  id="name" name="name" label="Name"/>
        {serverError.name ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.name[0]}</Typography> : ""}
        <TextField autoFocus  variant="standard"  autoComplete='off' margin="normal" fullWidth required  id="email" name="email" label="Email"/>
        {serverError.email ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.email[0]}</Typography> : ""}
        <TextField  autoFocus variant="standard" autoComplete='off'margin="normal" type="password" required fullWidth id="password" name="password" label="Password"/>
        {serverError.password ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.password[0]}</Typography> : ""}
        <TextField  autoFocus  variant="standard" autoComplete='off'margin="normal" type="password" required fullWidth id="password2" name="password2" label="Re-enter password"/>
        {serverError.password2 ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.password2[0]}</Typography> : ""}
        <FormControlLabel required id="agree" name="agree" control={<Checkbox value={true} name="tc" id="tc"/>} label="I agree to terms and condition" />
        {serverError.tc ? <span style={{fontSize: 12, color:'red'}}>{serverError.tc[0]}</span> : ""}
        {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors[0]}</Alert> : ''}
        <Box  sx={{my:2}} display="flex"  justifyContent="flex-end"  alignItems="flex-end"  >
          <Button variant="contained" style={{ borderRadius: 25,fontSize: 12 }} type="submit" >Register</Button>
          </Box>
        {server_msg.msg ? <Alert style={{ fontSize: 12}} sx={{my:3}} severity='success'>{server_msg.msg}</Alert> : ''}

        </Box>
        </ThemeProvider >
    </>
  )
}

export default Registration;
