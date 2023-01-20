import React from "react";
import { useEffect,useState  } from "react";

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
import "./styles/product.css"
import axios from "axios";


const Products = () => {
  const [data,setData]=useState([])
  const dispatch = useDispatch()
  useEffect(()=>{getProduct()},[])
  
  const getProduct=async ()=>{
    await axios({
    method: 'GET',
    
    url:'http://localhost:8000/api/product/',
  
  }).then(response=>{
    setData(response.data)
    
  })
}
console.log(data)


  return (
    <>
      <Box justifyContent="center" sx={{ ml: 4,mt:10 }}>
        <Grid
          container
          sx={{color:"whitesmoke"}}
          spacing={{ border: 1, xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((product) => (
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
      </Box>
    </>
  );
};

export default Products;
