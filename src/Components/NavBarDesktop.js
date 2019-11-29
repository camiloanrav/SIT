import React, {useState}  from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink} from 'react-router-dom';
import logo from '../logo-ser.png';

const NavBarDesktop = () => {
    return (
        <div>
            <header id="header-menu-desktop">

                <div id="hmd-bottom">
                    <span className="hmdb-line-left"></span>
                    <span className="hmdb-line-right"></span>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href="" ></a>
                    </div>
                    <div id="">
                        <img src={logo} width="400" alt="Logo"></img>
                    </div>
                    <ul>
                        <Link to="" style={{ textDecoration: 'none' }}  className="dropdown">
                            <li className="dd-btn">
                                    Inicio
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </Link>
                        
                        <NavLink to="/estadisticas" style={{ textDecoration: 'none' }} className="dropdown">
                            <li className="dd-btn">
                                    Estadísticas Territoriales
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>

                        <Link to="/publicaciones/documentos" style={{ textDecoration: 'none' }}  className="dropdown">
                            <li className="dd-btn">
                                    Publicaciones
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </Link>

                        <Link to="/contacto" style={{ textDecoration: 'none' }}  className="dropdown">
                            <li className="dd-btn">
                                    Contacto
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </Link>

                        <Link to="/ayuda" style={{ textDecoration: 'none' }}  className="dropdown">
                            <li className="dd-btn">
                                    Ayuda
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </Link>
                    </ul>
                    <span className="scroll-indicator"></span>
                </div>
            </header>
        </div>
    );
};

NavBarDesktop.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default NavBarDesktop;


{/*
btn:after {
    background-color: #000;
    content: '';
    display: block;
    height: .0625rem;
    left: -.75rem;
    position: absolute;
    top: 3.6875rem;
    width: calc(100% + 1.5rem);
}
*/}


