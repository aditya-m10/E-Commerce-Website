import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { TextField,Button,Box,Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "replace with service id",
        "replace with template id",
        form.current,
        "replace with user id"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>

    <Grid container justifyContent="center" sx={{my:10}}>

      <Box    ref={form}  onSubmit={sendEmail} component='form' noValidate sx={{ mt: 1}} id='message-form'>
      Email:
      <TextField  autoFocus  margin='normal' autoComplete='off'required fullWidth id='email'   type='email' name="email" label="Enter email"/>
      Message:
      <TextField sx={{ mt: 2}} fullWidth id="standard-multiline-static"
          multiline
          rows={4}
          label="Enter ur message here "
          />
      <Box >
        <Button type="submit"   style={{ borderRadius: 25,fontSize: 12 }} variant="contained" color="primary"  sx={{mt: 2,color:"white"  }} >Send</Button>
        
    </Box>
    </Box>
    </Grid>
    </ThemeProvider >


  );
};

export default Contact;
