import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch,useSelector } from "react-redux";
import { increment, decrement, clear } from "../../../features/cartSlice";
import { cartTotalPriceSelector } from "../../../features/selectors";


const Sidebar = ({ close }) => {
  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);


  return (
    <div className="sidebar">
      <div onClick={() => close()}>
        <IoMdCloseCircle color="#000" size={20} />
      </div>
      {cart.length > 0 ? (
          <button className="clear"  onClick={() => {
            dispatch(clear());
          }}>clear cart</button>
        ) : (
          <h3>Hurry Now!! Fill Your cart</h3>
        )}
      
      {cart.map((item) => (
        <div key={item.id}  className="cart-wrapper" >
          <div  className="image-wrapper ">
            <img src={item.cover} alt={item.title} ></img>
          </div>
          <div className="text-wrapper ">
            <span>{item.title}</span>
          </div>
          <div className="price-wrapper ">
            <span> Rs. {item.quantity * item.price }</span>
          </div>
          <div className="inc-dec">
          <button onClick={() => {
                    dispatch(increment(item.id));
                  } }>+</button>
          {item.quantity}
          <button disabled={item.quantity === 1} onClick={() => {
                    dispatch(decrement(item.id));
                  } }>-</button>
          </div>
          <button className="remove">Remove</button>

        </div>
      ))}
      
    </div>
  );
};

export default Sidebar;
