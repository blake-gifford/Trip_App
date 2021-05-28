import React,{useState, useContext} from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'
import Context from '../components/Context'
const Header = () => {
    const [ isAuthenticated, setIsAuthenticated]= useState(false)

    const context = useContext(Context)
    
    const logoutHandler = () => {
        axios.get('http://localhost:8000/api/logout',  { withCredentials: true })
            .then(response => {
                setIsAuthenticated(false)
                context.setLoggedInUser({
                _id: "",
                firstName: "",
                lastName:"",
                userName:"",
                email:"",})
                navigate("/")
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <div >
            <header className="dash_flex">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/trip/search">Search</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/trip/display/all">Your Trips</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/info">About Us</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/user/create">Create Account</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/user/login">Login</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/user/logout" onClick={logoutHandler}>Logout</Link>
                </li>
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">Account</Link>
                    <ul class="dropdown-menu">
                        <li><Link class="dropdown-item" to="/view/user">Account Info/</Link></li>
                        <li><Link class="dropdown-item" to="/user/login">Login/</Link></li>
                        <li><Link class="dropdown-item" to="/user/create">Create Account/</Link></li>
                        <li><Link class="dropdown-item" to="/user/create">Create Account/</Link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link class="dropdown-item" to="#">Separated link/</Link></li>
                    </ul>
                </li>
            </ul>
            </header>
        </div>
    )
}

export default Header
