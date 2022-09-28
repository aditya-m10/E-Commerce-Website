import * as React from 'react';
import {Button, Card,CardActions,CardContent,Box, Grid, Typography} from '@mui/material';
import { faker } from '@faker-js/faker';
import {   useNavigate } from 'react-router-dom';
import Slideroffers from './Slideroffers';
import Footer from './Footer';
const products = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.technics(),
}));
function Media(props) {
  const navigate = useNavigate()
  const  handleClick=()=>{
    navigate("/reslogin")
  }
  return (<>
  <Slideroffers />
  <Box  justifyContent="center"  sx={{flexGrow: 1,my:2, ml:10}}>

  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {products.map((product,id)=>(
      <Card style={{backgroundColor:"#EEF2E6"}} key={id} sx={{ width: 320,mx:2,my:2 }}>
        
        <img  onClick={handleClick} alt={product.name} height="200" width="320" src={product.image}/>

     
      <CardContent>
       
        <Typography onClick={handleClick} gutterBottom variant="body1" component="div">
          {product.name}
        </Typography>

        
        <Typography variant="body2" color="text.secondary">
          Price: Rs. {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Add to cart</Button>
        <Button size="small" variant="contained">Buy</Button>
      </CardActions>
    </Card>))}</Grid>
</Box>
<Footer/>
    </>
  );
}
  




export default Media ;

