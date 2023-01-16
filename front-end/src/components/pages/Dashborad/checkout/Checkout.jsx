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
import RemoveIcon from "@mui/icons-material/Remove";
import {
  increment,
  decrement,
  removeItem,
} from "../../../../features/cartSlice";
import { cartTotalPriceSelector } from "../../../../features/selectors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Success from "./Success";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Checkout = () => {
  const [success, setSuccess] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  const navigate = useNavigate();
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
      );
      return;
    }

    const orderData = await axios.post("http://127.0.0.1:8000/api/user/createOrder/", {
      amount: totalPrice,
    });

    const { amount, currency, order_id } = orderData.data;

    const options = {
      key: "", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Aadinath Sales",
      description: "Test Transaction",
      order_id: order_id,

      handler: async function (response) {
        const razorpay_paymentId = response.razorpay_payment_id;
        const razorpay_orderId = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;

        var res = await axios.post("http://127.0.0.1:8000/api/user/verifySignature/", {
          razorpay_paymentId,
          razorpay_orderId,
          razorpay_signature,
        });
        setSuccess(true);
        let order = JSON.parse(res.config.data);
        var OID = order.razorpay_orderId;
        var success = res.data.status;
        const data = { OID: OID, success: success };
        localStorage.setItem("orderData", JSON.stringify(data));
        setTimeout(() => navigate("/"), 4000);
      },
      prefill: {
        name: "John Doe",
        email: "doejon@example.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Box sx={{ my: 5, mx: 10 }}>
        {success ? (
          <Success />
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            sx={{ width: "100%" }}
          >
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
                        justifyContent: {
                          xs: "space-between",
                          sm: "flex-start",
                        },
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          dispatch(increment(item.id));
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      <Button sx={{ fontWeight: 600, fontSize: 18 }}>
                        {item.quantity}
                      </Button>
                      <IconButton
                        disabled={item.quantity === 1}
                        onClick={() => {
                          dispatch(decrement(item.id));
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Button
                        onClick={() => {
                          dispatch(removeItem(item.id));
                        }}
                      >
                        <Typography sx={{ color: "red" }}>Remove</Typography>
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Grid>
            <Grid
              xs={12}
              md={4}
              p={2}
              style={{ height: "400px" }}
              sx={{ backgroundColor: "whitesmoke" }}
            >
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
                  <Typography
                    onClick={displayRazorpay}
                    sx={{ fontSize: 25, position: "float" }}
                  >
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
                    {totalPrice > 0 && <a>Rs. {totalPrice}</a>}
                  </Typography>
                </Box>
              </Box>
              <hr />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Checkout;
