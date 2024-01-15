
import { Outlet } from "react-router-dom";
//import Header from "./header";
import Footer from "./footer";
import AiNavbar from "./aiNavbar";



const Layout = () => {
 return (
    <div>
   
      <AiNavbar />
      <Outlet />
      <Footer />
      </div>
 )

}
export default Layout;