import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home.jsx';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard.jsx';
import UserProfile from "./Component/user/UserProfile";


function App() {
  const [userjwtToken, setJwtToken] = useState("");
  const [adminJwtToken,setAdminJwtToken]=useState("")

  const auth = useSelector((state) => state.user?.token);

  const adminAuth=useSelector((state)=>state?.admin?.adminData?.payload)
  useEffect(() => {
    setJwtToken(auth);
    setAdminJwtToken(adminAuth)
  }, [auth,adminAuth]);
  
 
  return (
    <div className="app">
    <BrowserRouter>
    
      <Routes>
       
        <Route path="/" element={userjwtToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userjwtToken ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userjwtToken ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin/login" element={!adminJwtToken? <AdminLogin/>:  <Navigate to="/admin" />} />
        <Route path="/admin" element={ adminJwtToken ?<Dashboard/> :<Navigate to="/admin/login" />} />
        <Route path="/userprofile" element={ adminJwtToken ?<UserProfile/> :<Navigate to="/admin/login" />} />

      </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
