import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Public from './components/public';
import Lettres from './features/lettre/lettreList';
import CreateLettre from './features/lettre/createLettre';
import UpdateLettre from './features/lettre/UpdateLettre';


import Signup from "./features/Singup";
import Login from "./features/Login";
import EmailVerify from "./features/EmailVerify";
import ForgotPassword from "./features/ForgotPassword";
import PasswordReset from "./features/PasswordReset";
import Home from "./features/Cv/Home";
import Resume from "./features/Cv/Resume";
import ListResume from "./features/Cv/ListResume"
//import CVComponent from './features/Cv/CVComponent';
import CVComp from './features/Cv/CVComp';
import UpdateResume from'./features/Cv/updateResume';
import ErrorPage from './features/Cv/ErrorPage'
function App() {
  const user = localStorage.getItem("token");


 

  return (
    <div >
          <Routes>
          <Route path="/" element={<Layout />}>
                      <Route index element={<Public />} />
                    </Route>
           <Route path="/home" element={<Layout />}>
                      <Route index element={<Public />} />
          {user ?<>
                           <Route path="lettres" >
                                <Route index element={<Lettres />} />
                                <Route path="update/:id" element={<UpdateLettre />} />
                                <Route path="create" element={<CreateLettre />} />
                            </Route>
                            <Route path="resumes" >
                                <Route index element={<ListResume />} />
            
                                <Route path="create" element={<Home />} />
                                <Route path="show/:id" element={<Resume />} />
                                <Route path="showw/:id" element={<CVComp/>} />
                                <Route path="update/:id" element={<UpdateResume/>} />
                             </Route></>:
                             <Route path="*" element={<ErrorPage/>} />}

                             {!user ?<>
                             <Route path="login" exact element={<Login />} />
                             <Route path="signup" element={<Signup />} />
                             <Route path="users/:id/verify/:token" element={<EmailVerify />} />
                             <Route path="forgot-password" element={<ForgotPassword />} />
                             <Route path="password-reset/:id/:token" element={<PasswordReset />} />
                             </>:
                             <Route path="*" element={<ErrorPage/>} />}
        </Route>
       
       
      </Routes>
    </div>
  );
}
export default App;
