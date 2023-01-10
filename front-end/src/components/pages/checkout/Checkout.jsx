import React from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashNav from "../Auth/DashNav";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  increment,
  decrement,
  clear,
  removeItem,
} from "../../../features/cartSlice";
import { cartTotalPriceSelector } from "../../../features/selectors";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  return (
    <>
      <DashNav />
      <Box sx={{ my: 5, mx: 10 }}>
        <Grid container rowSpacing={1} columnSpacing={1} sx={{ width: "100%" }}>
          <Grid xs={12} md={8} p={1}>
            {cart.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <CardMedia
                  component="img"
                  width="124"
                  height="124"
                  alt="Beside Myself album cover"
                  src={item.cover}
                  sx={{
                    borderRadius: 0.5,
                    width: "clamp(124px, (304px - 100%) * 999 , 100%)",
                  }}
                />
                <Box sx={{ alignSelf: "center", px: { xs: 0, sm: 2 } }}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight={600}
                    sx={{
                      textAlign: { xs: "center", sm: "start" },
                      mt: { xs: 1.5, sm: 0 },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    component="div"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ textAlign: { xm: "center", sm: "start" } }}
                  >
                    Rs.{item.price}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 2,
                      justifyContent: { xs: "space-between", sm: "flex-start" },
                    }}
                  >
                    <IconButton onClick={() => {
                        dispatch(increment(item.id));
                      }} >
                    <AddIcon                    
                    />
                    </IconButton>
                    <Button sx={{fontWeight:600,fontSize: 18,}}>{item.quantity}</Button>
                    <IconButton disabled={item.quantity === 1}
                      onClick={() => {
                        dispatch(decrement(item.id));
                      }} >
                    <RemoveIcon/>
                      
                    </IconButton>
                    
                    
                    
                  </Stack>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid xs={12} md={4} p={2} sx={{ backgroundColor: "whitesmoke" }}>
            <Box>
              <Button
                style={{
                  width: "100%",
                  height: "60px",
                  minWidth: "30px",
                  minHeight: "30px",
                }}
                color="success"
                variant="contained"
              >
                <Typography sx={{ fontSize: 25, position: "float" }}>
                  Place Order
                </Typography>
              </Button>
            </Box>

            <hr />
            <Box
              sx={{
                display: "flex",
                mx: 1,
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography sx={{ fontWeight: 300 }}>
                Price:({cart.length} item ){" "}
              </Typography>
              <Box>
                <Typography>Rs. {totalPrice}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                mx: 1,
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography sx={{ fontWeight: 300 }}>Discount:</Typography>
              <Box>
                <Typography sx={{ color: "green", fontWeight: 800 }}>
                  Rs. -200
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                mx: 1,
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography sx={{ fontWeight: 300 }}>
                Delivery Charges:
              </Typography>
              <Box>
                <Typography>Rs. 200</Typography>
              </Box>
            </Box>
            <hr />
            <Box
              sx={{ display: "flex", mx: 1, justifyContent: "space-between" }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                Total:
              </Typography>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  Rs. {totalPrice}
                </Typography>
              </Box>
            </Box>
            <hr />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
