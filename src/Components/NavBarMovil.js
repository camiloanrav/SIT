import React, {useState} from 'react';
import PropTypes from 'prop-types';
import logo from '../logo-ser-2.png';
import {NavLink} from 'react-router-dom';

const NavBarMovil = ({ header, body }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>

            <header id="header-menu-mobile" class="">
                <div id="hmm-top" onClick={()=> setOpen(true)}>
                    <span class="hmmt-line"></span>
                    <a href="#" id="hmmt-menu-icon">
                        <span className="icon fas fa-bars"></span>
                        <p>Menú</p>
                    </a>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href="" ></a>
                    </div>
                    <a href="#" class="hmmt-logo">
                        <figure class="gf-figure-logo">
                            <img src={logo} alt="UAO"></img>
                        </figure>
                    </a>
                    <span class="scroll-indicator"></span>
                </div>
 
                <div id="hmm-bottom" className={"".concat(`${open===true?"hmm-open":""}`)}>
                    <div class="hmmb-icons">
                        <a href="#" id="hmmb-menu-icon-close" onClick={()=> setOpen(false)}>
                            <div class="circle-icon">
                                <span class="icon fas fa-times"></span>
                            </div>
                            <p>Cerrar</p>
                        </a>
                        <div id="hmmb-profile-dropdown">
                            <a href="#" id="hmmbpd-close">
                                <div class="circle-icon">
                                    <span class="icon fas fa-times"></span>
                                </div>
                                <p>Cerrar</p>
                            </a>
                        </div>
                    </div>
                    <ul class="hmmb-sections">
                        <li><NavLink to="/inicio">Inicio</NavLink></li>
                        <li><NavLink to="/estadisticas">Estadísticas Municipales</NavLink></li>
                        <li><NavLink to="/publicaciones/documentos">Publicaciones</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                        <li><NavLink to="/ayuda">Ayuda</NavLink></li>
                    </ul>
                    <div class="hmmb-footer">
                        {/* <ul class="hmmbf-legal">
                            <li><a href="">Política de Tratamiento de Datos Personales</a></li>
                            <li><a href="">Reglamento Estudiantil</a></li>
                            <li><a href="">Documentos legales</a></li>
                            <li><a href="">Transparencia y Acceso a la Información Pública</a></li>
                        </ul> */}
                        <div id="hmmbf-contact">
                            <h5>Contacto</h5>
                            <ul class="social-links">
                                <li><a href="" class="icon fab fa-facebook-square"></a></li>
                                <li><a href="" class="icon fab fa-twitter"></a></li>
                                <li><a href="" class="icon fab fa-instagram"></a></li>
                                <li><a href="" class="icon fab fa-youtube"></a></li>
                                <li><a href="" class="icon fab fa-linkedin"></a></li>
                            </ul>
                            <ul class="contact-list">
                                <li>
                                    <div class="contact-title">Teléfono</div>
                                    <div class="contact-info">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-phone"></span>
                                        </div>
                                        <div class="ci-text">
                                            PBX:+ 2 318 8000
                                            <br></br>
                                            Línea gratuita:
                                            <br></br>
                                            01 8000 91 34 35
                                        </div>
                                    </div>
                                    <div class="contact-directory">
                                        <a href="">Ver Directorio General &gt;</a>
                                    </div>
                                </li>
                                <li>
                                    <div class="contact-title">Correo Electrónico</div>
                                    <div class="contact-info">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-envelope"></span>
                                        </div>
                                        <div class="ci-text">
                                            <a href="">buzon@uao.edu.co</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="contact-title">Dirección de Campus principal</div>
                                    <div class="contact-info">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-university"></span>
                                        </div>
                                        <div class="ci-text">
                                            Cll 25#115-85
                                        <br></br>
                                            Km 2 Vía Cali-Jamundi
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="contact-title">Ciudad</div>
                                    <div class="contact-info">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-map-marker-alt"></span>
                                        </div>
                                        <div class="ci-text">
                                            Cali, Colombia
                                            <br></br>
                                            Código Postal: 760030
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

NavBarMovil.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default NavBarMovil;


