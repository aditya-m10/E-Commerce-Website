import { Navigate, Outlet } from "react-router-dom";
import DashNav from "./pages/Dashborad/DashNav";
import { getToken } from "../services/LocalStorage";


const Dashlayout =()=>{
    const { access_token } = getToken();

    return <>
     <DashNav />
     {access_token?<Outlet/>:<Navigate to="/reslogin" />}
    </>
};

export default Dashlayout;