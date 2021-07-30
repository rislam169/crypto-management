import React from 'react';
import { Link } from 'react-router-dom';
import Search from './../common/Search';
import './Header.css';
import logo from '../../logo.svg';
const Header = () => {
    return (
        <div className="header">
            <Link to='/'>
                <img src={logo} alt="Logo" className="Header-logo"/>
                <h1 className="Header-title">React Coin</h1>
            </Link>
            <Search />
        </div>
    );
}

export default Header;