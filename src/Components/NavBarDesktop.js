import React, {useState}  from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink} from 'react-router-dom';
import logo from '../logo-ser.png';

const NavBarDesktop = () => {
    return (
        <div>
            <header id="header-menu-desktop" class="">

                <div id="hmd-bottom">
                    <span class="hmdb-line-left"></span>
                    <span class="hmdb-line-right"></span>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href="" ></a>
                    </div>
                    <div id="">
                        <img src={logo} width="400" alt="Logo"></img>
                    </div>
                    <ul>
                        <Link to="" style={{ textDecoration: 'none' }}  class="dropdown">
                            <li class="dd-btn">
                                    Inicio
                                <span class="icon fas fa-angle-down"></span>
                            </li>
                        </Link>
                        
                        <NavLink to="/estadisticas" style={{ textDecoration: 'none' }} class="dropdown">
                            <li class="dd-btn">
                                    Estadísticas Territoriales
                                <span class="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>

                        <Link to="/publicaciones/documentos" style={{ textDecoration: 'none' }}  class="dropdown">
                            <li class="dd-btn">
                                    Publicaciones
                                <span class="icon fas fa-angle-down"></span>
                            </li>
                        </Link>

                        <Link to="/contacto" style={{ textDecoration: 'none' }}  class="dropdown">
                            <li class="dd-btn">
                                    Contacto
                                <span class="icon fas fa-angle-down"></span>
                            </li>
                        </Link>

                        <Link to="/ayuda" style={{ textDecoration: 'none' }}  class="dropdown">
                            <li class="dd-btn">
                                    Ayuda
                                <span class="icon fas fa-angle-down"></span>
                            </li>
                        </Link>
                    </ul>
                    <span class="scroll-indicator"></span>
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


