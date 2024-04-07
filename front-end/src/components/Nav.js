import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const Nav=()=>{
    const auth=localStorage.getItem("user");
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <div className='nav'>
            <img alt="logo" src='https://github.com/hs-only/project-images/blob/main/e-com.png?raw=true'
            className='logo'/>
            {auth?<ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/login">Logout({JSON.parse(auth).name})</Link></li>
                 </ul>
                 :
                <ul className='nav-ul nav-right'>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;