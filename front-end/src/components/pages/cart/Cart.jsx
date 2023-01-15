import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  clear,
  removeItem,
} from "../../../features/cartSlice";
import { cartTotalPriceSelector } from "../../../features/selectors";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardMedia,
  
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Sidebar = ({ close }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="cross" onClick={() => close()}>
        <IoMdCloseCircle color="#000" size={20} />
      </div>
      {cart.length > 0 ? (
        <div className="footerCart">
          <button
            className="clear"
            onClick={() => {
              dispatch(clear());
            }}
          >
            Clear Cart
          </button>
          <button className="buy">
            <a
              onClick={() => navigate("/dash/checkout")}
              style={{ fontSize: 14 }}
              underline="hover"
            >
              Checkout
            </a>
          </button>
        </div>
      ) : (
        <div className="hurry">Hurry Now !! Fill Your Cart</div>
      )}
      <div className="cart">
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
      </div>
      <div className="total">
        {totalPrice > 0 && (
          <h1>
            {" "}
            <a>Total</a> Rs. {totalPrice}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
