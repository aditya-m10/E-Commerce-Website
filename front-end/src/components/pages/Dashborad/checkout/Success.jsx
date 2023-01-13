import * as React from 'react';
import {CardActionArea,Typography,Box,CardContent,Card} from '@mui/material/';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export default function Success() {
  const data=JSON.parse(localStorage.getItem("orderData"))
  return (<>   
    <Typography   align='center'
 variant="body" component="div">
      Redirecting , Please wait....
    </Typography>
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="40vh" >
    <Card  sx={{ maxWidth: 450 }}>
      <Box sx={{mx:10,my:2}} >
      <CardActionArea sx={{display:'flex'}}>
        <CheckCircleOutlineIcon  sx={{maxWidth:100,fontSize:40,color:'green'}}/>        
        <CardContent   >
          <Typography   variant="h5" component="div">
            {data.success}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <hr />
      <Typography  align='center'  variant="body" component="div">
            Your order Id :  <Typography component="div" sx={{color:"green",fontSize:30}}>{data.OID.slice(6).toLowerCase()}</Typography>
      </Typography>
      </Box>
    </Card>
    </Box> </>
  );
}