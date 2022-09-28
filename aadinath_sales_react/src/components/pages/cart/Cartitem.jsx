import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {CardMedia,CardContent} from '@mui/material';
import { CssBaseline, Typography } from '@mui/material';
import { MdDelete } from "react-icons/md";


export default function ActionAreaCard() {

  return (
    <>
    <CssBaseline />
    <Box sx={{mt:2,display: 'flex',flexDirection: 'column'}}  >
      
      <Box>

    <Card sx={{ width: 480 , height: 150}}>
      <CardMedia
        component="img"
        sx={{ width: 151,height:150 }}        
        image="https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/m/x/y/-original-imagg7tbhm2adppj.jpeg?q=70"
        alt="Paella dish"
      />    </Box>

      
      ox><CardContent sx={{float: 'left', }}>
          <Typography component="div" variant="body1">
Campus Ignite         
 </Typography>
         
        </CardContent>
    
    
  </Card>
  </Box></>
  );
}
