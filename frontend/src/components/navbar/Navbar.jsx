import "./navbar.css"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
const Navbar = () => {
  const {user}=useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
            <span className="logo">SBH Booking</span></Link>
          {!user?(  <div className="navItems">
                <button className="navButton"><Link to="/signup">   Register </Link></button>
                <button className="navButton"><Link to="/login"> Login</Link></button>
            </div>):(<>{user.username} <button className="navButton"><Link to="/Logout"> Logout</Link></button></>)}
        </div>
    </div>
  )
}

export default Navbar