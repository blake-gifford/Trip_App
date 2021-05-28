import React from 'react'
import { Link } from '@reach/router'
const Header = () => {
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
