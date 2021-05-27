import React from 'react'
import { Link } from '@reach/router'
const Header = () => {
    return (
        <div >
            <header className='dash_flex' >
                <h5><Link to="/user/view">Account</Link>|<Link to="/trip/search">Search for a Trip</Link>|<Link to="/trip/display/all">Your Trips</Link>|<Link to="/info">Contact Us</Link>|<Link to="/info">About</Link>|<Link to="/user/create">Sign Up!|</Link>
                <Link to="/user/login">Login|</Link>
                <Link to="/">Logout</Link></h5>
                {/* <h5><Link to="/trip/create">Create Trip</Link>|</h5>
                <h5><Link to="/trip/display/all">Your Trips</Link>|</h5>
                <h5><Link to="/info">Contact Us</Link>|</h5>
                <h5><Link to="/info">About</Link>|</h5> */}
                {/* <Link to="/user/create">Sign Up!|</Link>
                <Link to="/user/login">Login|</Link>
                <Link to="/">Logout</Link> */}
                
            </header>
        </div>
    )
}

export default Header
