import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';
import camera from '../../assets/camera.svg';

class Header extends React.Component {
    render() {
        return (
            <header id="main-header">
                <div className="header-content">
                    <Link to="/">
                        <img src={logo} alt="Instagram"/>
                    </Link>
                    <Link to="/new">
                        <img src={camera} alt="Enviar publicação"/>
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;