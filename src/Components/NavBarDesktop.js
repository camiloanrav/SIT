import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InicioContainer from '../Containers/InicioContainer';

const NavBarDesktop = () => {
    return (
        <div>
            <header id="header-menu-desktop" class="">

                <div id="hmd-bottom">
                    <span class="hmdb-line-left"></span>
                    <span class="hmdb-line-right"></span>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href=""></a>
                    </div>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href=""></a>
                    </div>
                    <ul>
                            <li class="dropdown">
                                <Link to={""}>
                                    <div class="dd-btn">
                                        Inicio
                                    </div>
                                </Link>
                            </li>
                        
                        <li class="dropdown">
                            <Link to={"Estadisticas"}>
                                <div class="dd-btn">
                                    Estadisticas Territoriales
                                </div>
                            </Link>
                        </li>
                        <li class="dropdown">
                            <div class="dd-btn">
                                Publicaciones
                            </div>
                        </li>
                        <li class="dropdown">
                            <Link to={"Contacto"}>
                                <div class="dd-btn">
                                    Contacto
                                </div>
                            </Link>
                        </li>
                        <li class="dropdown">
                            <Link to={"Ayuda"}>
                                <div class="dd-btn">
                                    Ayuda
                                </div>
                            </Link>
                        </li>
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


