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
// import { faker } from "@faker-js/faker";
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../features/cartSlice';

// const products = [...Array(20)].map(() => ({
//   id: faker.datatype.uuid(),
//   name: faker.commerce.productName(),
//   price: faker.commerce.price(),
//   image: faker.image.technics(),
// }));

const Products = () => {
  const dispatch = useDispatch()

  
  return (
    <>
      <Box justifyContent="center" sx={{ mx: 3, px: 5, py: 2 }}>
        <Grid
          container
          spacing={{ border: 1, xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product, id) => (
            <Card
              style={{ backgroundColor: "#EEF2E6" }}
              key={id}
              sx={{ width: 300, mx: 2, my: 2 }}
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
              <CardActions>
                <Button onClick={() => 
    dispatch(addToCart(
      product
    )) }size="small" variant="contained">
                  Add to cart
                </Button>
                <Button size="small" variant="contained">
                  Buy
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
