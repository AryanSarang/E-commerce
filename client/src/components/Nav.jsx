import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Nav = () => {
    const Navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const logOut = () => {
        localStorage.clear();
        Navigate("/signup");
    }
    return (
        <div className="container-fluid" id="title">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <ShoppingCartIcon sx={{ fontSize: 60, color: "white" }} className="navbar-brand"
                    onClick={() => Navigate("/")} />
                <button class="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 {auth && 
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"> <Link to="/"><HomeIcon sx={{ fontSize: 30, color: "white" }} className="icon" /></Link> </li>
                        <li className="nav-item"> <Link to="/addproduct"><AddCircleIcon sx={{ fontSize: 30, color: "white" }} className="icon" /></Link> </li>
                        {/* <li> <Link to="/updateproduct">Update Product</Link> </li> */}
                        <li className="nav-item"> <Link to="/profile"><PersonIcon sx={{ fontSize: 30, color: "white" }} className="icon" /></Link> </li>
                        <li className="nav-item"><Link onClick={logOut} to="/signup"><LogoutIcon sx={{ fontSize: 30, color: "white" }} className="icon" /></Link></li>
                    </ul>
                     } </div>
            </nav>
        </div>
    );
}
export default Nav;