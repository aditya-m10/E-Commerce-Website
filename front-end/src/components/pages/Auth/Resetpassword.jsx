import {useState} from "react";
import {   useNavigate } from 'react-router-dom';
import { Typography,TextField,Button,Box,Alert,Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import { useChangeUserPasswordMutation } from "../../../services/Authenticationapi";
import { getToken } from '../../../services/LocalStorage';

const ResetPassword=()=>{
    const { access_token } = getToken()

    const navigate=useNavigate()
    const [server_error, setServerError] = useState({})
    const [server_msg, setServerMsg] = useState({})
    const [resetPassword] = useChangeUserPasswordMutation()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actualData = {
          password: data.get('password'),
          password2: data.get('password2'),
        }
        const res = await resetPassword({ actualData, access_token })
        if (res.error) {
          setServerMsg({})
          setServerError(res.error.data.errors)
        }
        if (res.data) {
          setServerError({})
          setServerMsg(res.data)
          setTimeout(() => {
            navigate("/dash")
          }, 3000)
        }
    
      };
      // Getting User Data from Redux Store
      // console.log("Change Password", myData)
    
    return (
        <>
        <ThemeProvider theme={theme}>

<Grid container sx={{mt:10}} justifyContent='center'>
  <Grid item sm={3} xs={12}>
  <Typography  align="center" variant='h5'sx={{color:"green",flexGrow:1,fontWeight: 'bold'}}  >
            AADINAATH<span style={{fontSize:12,}} > Sales</span>
        </Typography> 
    <Box   onSubmit={handleSubmit} component='form' noValidate sx={{ mt: 1 }} id='password-reset-form'>
    <TextField  autoFocus  variant="standard" margin='normal' autoComplete='off'required fullWidth id='password'   type='password' name="password" label="Enter new password"/>
    {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}

    <TextField  autoFocus  variant="standard" autoComplete='off'margin='normal' required fullWidth id='password2' name='password2'type='password' label="Re-enter password"/>
    {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}
    {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    {server_msg.msg ? <Alert style={{ fontSize: 12}} sx={{my:3}} severity='success'>{server_msg.msg}</Alert> : ''}

    <Box >
        <Button type="submit"  style={{ borderRadius: 25,fontSize: 12 }} variant="contained" color="primary"  sx={{mt: 2,color:"white"  }} >Send</Button>
        

    </Box>


    </Box>
  </Grid>
</Grid>
</ThemeProvider >

        </>
    )
}

export default ResetPassword;