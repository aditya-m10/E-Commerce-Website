import React from "react";
import products from "../../../data/Data";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../features/cartSlice';



const Products = () => {
  const dispatch = useDispatch()

  
  return (
    <>
      <Box justifyContent="center" sx={{ ml: 4  }}>
        <Grid
          container
          
          spacing={{ border: 1, xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product) => (
            <Card
              style={{ backgroundColor: "#EEF2E6" }}
              key={product.id}
              sx={{ maxWidth: 300,my:1  }}
            >
              <img
                alt={product.title}
                height="300"
                width="auto"
                src={product.cover}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                >
                  {product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Price: Rs. {product.price}
                </Typography>
              </CardContent>
              <Box>
              <CardActions   >
                <Button   style={{ width: "100%", height:"40px" 
                  }} onClick={() => 
    dispatch(addToCart(
      product
    )) }  sx={{ fontSize: 15,backgroundColor:"#FB8C00"}} color="warning" variant="contained" >
                  Add to cart
                </Button>
                <Button style={{ width: "100%",
                 height:"40px" }}               
                 sx={{ fontSize: 18,backgroundColor:"#EF6C00"}} color="warning" variant="contained">
                  Buy
                </Button>
              </CardActions>
              </Box>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
