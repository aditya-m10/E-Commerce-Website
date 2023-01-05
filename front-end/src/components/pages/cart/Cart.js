import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";

const Sidebar = ({ close }) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="sidebar">
      <div onClick={() => close()}>
        <IoMdCloseCircle color="#000" size={20} />
      </div>
      <button className="clear">clear cart</button>
      {cart.map((item) => (
        <div key={item.id}  className="cart-wrapper" >
          <div  className="image-wrapper ">
            <img src={item.cover} alt={item.title} ></img>
          </div>
          <div className="text-wrapper ">
            <span>{item.title}</span>
          </div>
          <div className="price-wrapper ">
            <span> Rs. {item.price}</span>
          </div>
          <div className="inc-dec">
          <button >+</button>
          1
          <button >-</button>
          </div>
          <button className="remove">Remove</button>

        </div>
      ))}
      
    </div>
  );
};

export default Sidebar;
