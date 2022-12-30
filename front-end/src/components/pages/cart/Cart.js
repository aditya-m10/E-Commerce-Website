import { IoMdCloseCircle } from "react-icons/io";
import ActionAreaCard from "./Cartitem";

const Sidebar = ({ close }) => {
  return (
    <aside className="sidebar">
      <div onClick={() => close()}>
        <IoMdCloseCircle color="#000" size={20} />
      </div>
      <ActionAreaCard />
    </aside>
  );
};

export default Sidebar;
