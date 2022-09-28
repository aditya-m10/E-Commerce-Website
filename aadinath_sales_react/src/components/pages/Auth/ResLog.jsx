import  Login  from './Login';
import { Grid,Box, Typography } from '@mui/material';
import theme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';




function ResLogin() {
    
  return (
    <>
    <ThemeProvider theme={theme}>

    <Grid justifyContent='center' container >
        <Grid   item lg={5} sm={7}>
            <Box  >
                <Box  sx={{mt:10}} align="center" >
                        <Typography variant="h5" sx={{textTransform: 'none',fontWeight: 'bold',my: 2,color: "green" }}>Login</Typography>     
                </Box>
                <Login />
                </Box>

        </Grid>
    </Grid>    
    </ThemeProvider>
    </>
  )
}

export default ResLogin;