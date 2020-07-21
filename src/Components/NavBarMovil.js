import React, {useState} from 'react';
import logo from '../logo-ser-2.png';
import {NavLink} from 'react-router-dom';

const NavBarMovil = ({user}) => {
    const [open, setOpen] = useState(false);
    return (
        <div>

            <header id="header-menu-mobile">
                <div id="hmm-top" onClick={()=> setOpen(true)}>
                    <span className="hmmt-line"></span>
                    <a href="#/" id="hmmt-menu-icon">
                        <span className="icon fas fa-bars"></span>
                        <p>Menú</p>
                    </a>
                    <div id="hmdb-logo-container">
                        <a id="hmdb-logo" href="#/" ></a>
                    </div>
                    <a href="#/" className="hmmt-logo">
                        <figure className="gf-figure-logo">
                            <img src={logo} alt="UAO"></img>
                        </figure>
                    </a>
                    <span className="scroll-indicator"></span>
                </div>
 
                <div id="hmm-bottom" className={"".concat(`${open===true?"hmm-open":""}`)}>
                    <div className="hmmb-icons">
                        <a href="#/" id="hmmb-menu-icon-close" onClick={()=> setOpen(false)}>
                            <div className="circle-icon">
                                <span className="icon fas fa-times"></span>
                            </div>
                            <p>Cerrar</p>
                        </a>
                        <div id="hmmb-profile-dropdown">
                            <a href="#/" id="hmmbpd-close">
                                <div className="circle-icon">
                                    <span className="icon fas fa-times"></span>
                                </div>
                                <p>Cerrar</p>
                            </a>
                        </div>
                    </div>
                    {
                        user === "administrador" ?
                        <ul className="hmmb-sections">
                            <li><NavLink to="/ser/administrador-inicio">Admin Inicio</NavLink></li>
                            <li><NavLink to="/ser/administrador-estadisticas"> Admin Estadísticas</NavLink></li>
                            <li><NavLink to="/ser/administrador-publicaciones/documentos">Admin Publicaciones</NavLink></li>
                            <li><NavLink onClick={()=>{sessionStorage.clear(); }} to="/ser/login">
                                Cerrar Sesión   <i style={{margin:'0 0 0 0.5em'}} className="fas fa-sign-out-alt"></i>
                                </NavLink>
                            </li>
                        </ul>
                        :
                        <ul className="hmmb-sections">
                            <li><NavLink to="/ser/inicio">Inicio</NavLink></li>
                            <li><NavLink to="/ser/estadisticas">Estadísticas Municipales</NavLink></li>
                            <li><NavLink to="/ser/publicaciones/documentos">Publicaciones</NavLink></li>
                            <li><NavLink to="/ser/contacto">Contacto</NavLink></li>
                            <li><NavLink to="/ser/ayuda">Ayuda</NavLink></li>
                        </ul>
                    }
                    <div className="hmmb-footer">
                        <div id="hmmbf-contact">
                            <h5>Contacto</h5>
                            <ul className="social-links">
                                <li><a href="https://es-la.facebook.com/universidadautonomadeoccidente/" className="icon fab fa-facebook-square"></a></li>
                                <li><a href="https://twitter.com/lauao" className="icon fab fa-twitter"></a></li>
                                <li><a href="https://www.instagram.com/universidadautonomadeoccidente/?hl=es-la" className="icon fab fa-instagram"></a></li>
                                <li><a href="https://www.youtube.com/channel/UCakpB12sFykpJY6lqImL5uQ" className="icon fab fa-youtube"></a></li>
                                <li><a href="https://co.linkedin.com/school/universidadautonomadeoccidente/" className="icon fab fa-linkedin"></a></li>
                            </ul>
                            <ul className="contact-list">
                                <li>
                                    <div className="contact-title">Teléfono</div>
                                    <div className="contact-info">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-phone"></span>
                                        </div>
                                        <div className="ci-text">
                                            PBX:+ 2 318 8000
                                            <br></br>
                                            Línea gratuita:
                                            <br></br>
                                            01 8000 91 34 35
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="contact-title">Correo Electrónico</div>
                                    <div className="contact-info">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-envelope"></span>
                                        </div>
                                        <div className="ci-text">
                                            <a href="#/">buzon@uao.edu.co</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="contact-title">Dirección de Campus principal</div>
                                    <div className="contact-info">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-university"></span>
                                        </div>
                                        <div className="ci-text">
                                            Cll 25#115-85
                                        <br></br>
                                            Km 2 Vía Cali-Jamundi
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="contact-title">Ciudad</div>
                                    <div className="contact-info">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-map-marker-alt"></span>
                                        </div>
                                        <div className="ci-text">
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

export default NavBarMovil;


