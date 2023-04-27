import React, { useContext, useState } from 'react'
import Axios from "../../Axios/Axios";
import "./login.scss"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
function Login() {
    const [credential,setcredential]=useState({username:undefined,password:undefined});
    const {user, loading,error,dispatch}=useContext(AuthContext)
const   handlechange=(e)=>{
    setcredential((prev)=>({...prev,[e.target.id]:e.target.value}));
}
const navigate=useNavigate();
const submit=async(e)=>{
e.preventDefault()
dispatch({type:"LOGIN_START"})
try {
    const res=await Axios.post("/auth/login", credential)
    dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    navigate("/")
} catch (error) {
    dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    
}
}
console.log(user)
    return (
    <div className=' login'>
        <div className="lcontainer">
        {error&& <span> {error.message}</span>}
            <h1 style={{textAlign:'center'}}>Sign In</h1>
            <div><input type="text"  placeholder='Useraneme  '  onChange={handlechange} className="username" id="username" /></div>
            <div><input type="password" placeholder= 'password'  onChange={handlechange} className="password" id="password" /></div>
            <div><button disabled={loading} type='submit' onClick={submit} className="lbtn">Sign In</button></div>
        </div>
      
    </div>
  )
}

export default Login
