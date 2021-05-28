import React from 'react'
import { Link } from '@reach/router'
const Header = () => {
    return (
        <div >
            <header className="dash_flex">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/trip/search">Search</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/trip/display/all">Your Trips</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/info">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user/create">Create Account</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Account</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/view/user">Account Info</a></li>
                        <li><a class="dropdown-item" href="/user/login">Login</a></li>
                        <li><a class="dropdown-item" href="/user/create">Create Account</a></li>
                        <li><a class="dropdown-item" href="/user/create">Create Account</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul>
            </header>
        </div>
    )
}

export default Header
