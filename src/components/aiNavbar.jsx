import { useState, useEffect } from 'react';
import './Form.css';
import ailogo from '../assets/ailogo.jpg'
import '../features/lettre/style.css'
import { Link , useNavigate} from "react-router-dom";
const AiNavbar= () => {
  const navigate = useNavigate();
  const userEmail =localStorage.getItem("userEmail");
 
  const [sidebarLocked, setSidebarLocked] = useState(true);

	const handleLogout = () => {
	  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
 
  navigate('/home/login'); // Naviguer vers la page de connexion
  window.location.reload();


	};
 
   


    const toggleLock = () => {
    setSidebarLocked(!sidebarLocked);
    
};

useEffect(() => {
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");


const hideSidebar = () => {
    if (!sidebarLocked) {
      sidebar.classList.add("close");
    }
  };
  
  const showSidebar = () => {
    if (!sidebarLocked) {
      sidebar.classList.remove("close");
    }
  };
 
  
  const toggleSidebar = () => {
    sidebar.classList.toggle("close");
  };
  
  if (sidebar && sidebarLockBtn && sidebarOpenBtn && sidebarCloseBtn) {
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebar.addEventListener("mouseleave", hideSidebar);
    sidebar.addEventListener("mouseenter", showSidebar);
    sidebarOpenBtn.addEventListener("click", toggleSidebar);
    sidebarCloseBtn.addEventListener("click", toggleSidebar);
  }
  
  return () => {
    if (sidebar && sidebarLockBtn && sidebarOpenBtn && sidebarCloseBtn) {
      sidebarLockBtn.removeEventListener("click", toggleLock);
      sidebar.removeEventListener("mouseleave", hideSidebar);
      sidebar.removeEventListener("mouseenter", showSidebar);
      sidebarOpenBtn.removeEventListener("click", toggleSidebar);
      sidebarCloseBtn.removeEventListener("click", toggleSidebar);
    }
  };
  }, [sidebarLocked]);
  return (
  

    <div > 
     <nav className="sidebar locked">
      <div className="logo_items flex">
        <span className="nav_image">
          <img src={ailogo} alt="logo_img" />
        </span>
        <span className="logo_name">AIProResume</span>
        <i className="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
        <i className="bx bx-x" id="sidebar-close"></i>
      </div>

      <div className="menu_container">
        <div className="menu_items">
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Dashboard</span>
              <span className="line"></span>
            </div>
          
            <li className="item">
            <Link to="/home" className="link flex">

                <i className="bx bx-home-alt"></i>
                <span>Overview</span>
              </Link>
            </li>
            <li className="item">
            <Link to="/home/resumes"className="link flex">
                <i className="bx bx-grid-alt"></i>
                <span>All Resumes</span>
                </Link>
            </li>
            <li className="item">
            <Link to="/home/lettres"className="link flex">
                <i className="bx bx-grid-alt"></i>
                <span>All Lettres</span>
                </Link>
            </li>
          </ul>

          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Editor</span>
              <span className="line"></span>
            </div>
            <li className="item">
            <Link to="resumes/create" className="link flex">
                <i className="bx bxs-magic-wand"></i>
                <span>New Resume</span>
                </Link>
            </li>
            <li className="item">
            <Link to="lettres/create" className="link flex">
                <i className="bx bxs-magic-wand"></i>
                <span>New Lettre</span>
                </Link>
            </li>
          
            <li className="item">
              <a className="link flex" onClick={handleLogout}>
                <i className="bx bx-cloud-upload"></i>
               <span>{userEmail ? "Logout" : "Login"}</span>
              </a>
            </li>
          </ul>

         
        </div>

        <div className="sidebar_profile flex">
       
         
          <div className="data_text">
         
            <span className="email">{userEmail}</span>
          </div>
        </div>
      </div>
    </nav>
 
    <div >
      <i className="bx bx-menu" id="sidebar-open"></i>
      

   
 





 

    </div>
   
    
   </div>
  
  
  );
};

export default AiNavbar;