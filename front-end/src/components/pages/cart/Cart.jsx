import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";
import { increment, decrement, clear,removeItem } from "../../../features/cartSlice";
import { cartTotalPriceSelector } from "../../../features/selectors";
import {   useNavigate } from 'react-router-dom';


const Sidebar = ({ close }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  const navigate=useNavigate()

  return (
    <div className="sidebar">
      <div className="cross" onClick={() => close()}>
        <IoMdCloseCircle color="#000" size={20} />
      </div>
      {cart.length > 0 ? (<div className="footerCart">
      <button
      className="clear"
      onClick={() => {
        dispatch(clear());
      }}
    >
      Clear Cart
    </button>
        <button
          className="buy" 
        ><a onClick={()=>navigate("/checkout")} style={{fontSize: 14}}  underline="hover">Checkout</a>
          
        </button></div>
      ) : (
        <div className="hurry">
               Hurry Now !! 
              Fill Your Cart
        </div>
      )}
      <div className="cart">
      {cart.map((item) => (
        <div key={item.id} className="cart-wrapper">
          <div className="image-wrapper ">
            <img src={item.cover} alt={item.title}></img>
          </div>
          <div className="text-wrapper ">
            <span>{item.title}</span>
          </div>
          <div className="price-wrapper ">
            <span> Rs. {item.quantity * item.price}</span>
          </div>
          <div className="inc-dec">
            <button
              onClick={() => {
                dispatch(increment(item.id));
              }}
            >
              +
            </button>
            <button style={{backgroundColor: "white", color:"black"}}>{item.quantity}</button>
            <button
              disabled={item.quantity === 1}
              onClick={() => {
                dispatch(decrement(item.id));
              }}
            >
              - 
            </button>
          </div>
          <button onClick={() => {
                dispatch(removeItem(item.id));
              } }className="remove">Remove</button>
        </div>
      ))}
      </div>
      <div className="total">
      
      {totalPrice > 0 && <h1 > <a>Total</a> Rs. {totalPrice}</h1>}
      </div>
    </div>
  );
};

export default Sidebar;
