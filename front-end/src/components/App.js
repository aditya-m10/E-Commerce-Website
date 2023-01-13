import Home from './pages/home/Home'; 
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Layout from './Layout'; 
import ResLogin from './pages/Auth/ResLog';
// import Dashboard from './pages/Auth/DashNav';
import ResetPassword from './pages/Auth/Resetpassword';
import { useSelector } from "react-redux";
import ResetmailPassword from './pages/Auth/Mailreset';
import Footer from './pages/home/Footer';
import Checkout from './pages/Dashborad/checkout/Checkout';
import Success from './pages/Dashborad/checkout/Success';
import Dashlayout from "./Dashlayout"
import Profile from './pages/Dashborad/Profile/Profile';
function App() {
  const { access_token } = useSelector(state => state.auth)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reslogin" element={!access_token ? <ResLogin /> : <Navigate to="/dash/checkout" />} />
          <Route path="footer" element={<Footer />} />



        </Route>
         
        <Route  path="/dash" element={<Dashlayout/>} >
           <Route index element={< Profile/>} />
           <Route path="checkout" element={< Checkout/>} />
           <Route path="reset" element={<ResetPassword /> } />


        </Route>
        <Route path="success" element={<Success />} />

        {/* <Route path="checkout" element={<Checkout />} /> */}

        

        <Route path="api/user/reset/:id/:token" element={<ResetmailPassword />} />

{/* {        <Route path="dashboard" element={access_token ? /> : <Navigate to="/reslogin" />} /> */}
        <Route path="*" element={<h1>Error 404 </h1>} />


      </Routes>
    </BrowserRouter>

    </>
  )

}

export default App;
