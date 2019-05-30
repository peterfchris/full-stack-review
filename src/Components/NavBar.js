import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const NavBar = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
        </nav>
    )
}

export default NavBar
