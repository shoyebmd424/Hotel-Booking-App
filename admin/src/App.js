import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {Navigate} from "react-router-dom"

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoutes=({children})=>{
    const {user}=useContext(AuthContext);
    if(!user){
      return <Navigate to="/login"/>
    }else{
    return  children;
    }
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
            <ProtectedRoutes>   
               <Home />
           </ProtectedRoutes>
} />
            <Route path="user">
              <Route index element={       <ProtectedRoutes> <List />       </ProtectedRoutes> } />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={       <ProtectedRoutes>  <New inputs={userInputs} title="Add New User" />       </ProtectedRoutes> }
              />
            </Route>
            <Route path="products">
              <Route index element={       <ProtectedRoutes> <List />       </ProtectedRoutes> } />
              <Route path=":productId" element={       <ProtectedRoutes> <Single />       </ProtectedRoutes> } />
              <Route
                path="new"
                element={       <ProtectedRoutes> <New inputs={productInputs} title="Add New Product" />       </ProtectedRoutes> }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
