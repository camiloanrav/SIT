import React, {useState}  from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink} from 'react-router-dom';
import logo from '../logo-ser.png';
//import Select from 'react-select/src/Select';

const NavBarDesktop = () => {
    const [activo, setActivo] = useState(0);
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
                        <NavLink to="/inicio" className="dropdown" activeClassName="activeNavBar">
                            <div className="dd-btn">
                                    Inicio
                                <span className="icon fas fa-angle-down"></span>
                            </div>
                        </NavLink>
                        
                        <NavLink to="/estadisticas" activeClassName="activeNavBar" className="dropdown">
                            <li className="dd-btn" activeStyle={{color: 'white'}}>
                                    Estadísticas Territoriales
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>

                        <NavLink to="/publicaciones/documentos" activeClassName="activeNavBar"  className="dropdown">
                            <li className="dd-btn">
                                    Publicaciones
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>

                        <NavLink to="/contacto" activeClassName="activeNavBar" className="dropdown">
                            <li className="dd-btn">
                                    Contacto
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>

                        <NavLink to="/ayuda" activeClassName="activeNavBar"  className="dropdown">
                            <li className="dd-btn">
                                    Ayuda
                                <span className="icon fas fa-angle-down"></span>
                            </li>
                        </NavLink>
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


