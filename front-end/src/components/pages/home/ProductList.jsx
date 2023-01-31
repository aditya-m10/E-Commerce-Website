import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '../../../features/cartSlice';
import "./styles/product.css"
import Category from "./Category";



const Products = () => {
  const product = useSelector((state) => state.product);
  console.log("product",product)
  const dispatch = useDispatch()
  
  

  return (
    <>
       <Category/>

      {product.length>0 ?<Box justifyContent="center" sx={{ ml: 4,mt:2 }}>
        <Grid
          container
          sx={{color:"whitesmoke"}}
          spacing={{ border: 1, xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {product.map((product) => (
           <Card className="zoom-card"
              style={{ backgroundColor: "#EEF2E6" }}
              key={product.id}
              sx={{ maxWidth: 300,my:2,  }}
            >
              <img
                alt={product.product_name}
                height="300"
                width="300"
                src={`http://localhost:8000${product.image}`}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                >
                  {product.product_name}
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
      </Box>:<><Box justifyContent="center" sx={{ ml: 4,my:10 }}><Typography align="center" sx={{fontSize:20,fontWeight:600}}>No Results Found</Typography></Box></>}
    </>
  );
};

export default Products;
