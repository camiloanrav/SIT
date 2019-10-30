import React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo-ser.png';

const NavBarMovil = ({ header, body }) => {
    return (
        <div>

            <header id="header-menu-mobile" class="">
                <div id="hmm-top">
                    <span class="hmmt-line"></span>
                    <a href="#" id="hmmt-menu-icon">
                        <span class="icon fas fa-hamburguesa"></span>
                        <p>Menú</p>
                    </a>
                    <a href="#" class="hmmt-logo">
                        <figure class="gf-figure-logo">
                            <img src={logo} alt="UAO"></img>
                        </figure>
                    </a>

                    <span class="scroll-indicator"></span>
                </div>

                <div id="hmm-bottom">
                    <div class="hmmb-icons">
                        <a href="#" id="hmmb-menu-icon-close">
                            <div class="circle-icon">
                                <span class="icon fas fa-close"></span>
                            </div>
                            <p>Cerrar</p>
                        </a>
                        <div id="hmmb-profile">

                            <button class="profile-btn ">
                                <div class="pb-circle">
                                    <div>
                                        <span class="icon fas fa-hand-point-up"></span>
                                    </div>
                                </div>
                                <div class="pb-rectangle">Elige tu perfil</div>
                            </button>
                        </div>
                        <div id="hmmb-profile-dropdown">
                            <a href="#" id="hmmbpd-close">
                                <div class="circle-icon">
                                    <span class="icon fas fa-close"></span>
                                </div>
                                <p>Cerrar</p>
                            </a>
                            <div class="hmmbpd-container">
                                <span>Selecciona uno de los perfiles y encuentra información de tu interés.</span>
                                <ul>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-user-plus"></span>
                                            </div>
                                            <p>Aspirante</p>
                                        </li>
                                    </a>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-users"></span>
                                            </div>
                                            <p>Estudiante</p>
                                        </li>
                                    </a>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-graduation-cap"></span>
                                            </div>
                                            <p>Egresado</p>
                                        </li>
                                    </a>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-book"></span>
                                            </div>
                                            <p>Docente</p>
                                        </li>
                                    </a>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-address-card"></span>
                                            </div>
                                            <p>Colaborador</p>
                                        </li>
                                    </a>
                                    <a href="">
                                        <li>
                                            <div class="circle-icon">
                                                <span class="icon fas fa-university"></span>
                                            </div>
                                            <p>Entidad</p>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul class="hmmb-sections">
                        <li><a href="">CRAI Biblioteca</a></li>
                        <li><a href="">Agencia de Noticias</a></li>
                        <li><a href="">Agenda de Eventos</a></li>
                        <li><a href="">UAO Virtual</a></li>
                        <li>
                            <a href="">
                                <div class="circle-icon">
                                    <span class="icon fas fa-envelope"></span>
                                </div>
                                Tu correo institucional
                            </a>
                        </li>
                    </ul>
                    <ul class="hmmb-principal">
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Institución</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">Nuestro campus</a></li>
                                <li><a href="#">Información institucional</a></li>
                                <li><a href="#">Documentos institucionales</a></li>
                                <li><a href="#">Símbolos institucionales</a></li>
                                <li><a href="#">Órganos de gobierno institucionales</a></li>
                                <li><a href="#">Planeación y efectividad institucional</a></li>
                                <li><a href="#">Directorio general</a></li>
                                <li><a href="#">Lista de docentes</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Oferta Académica</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">¿En qué estás interesado?</a></li>
                                <li><a href="#">Pregrados</a></li>
                                <li><a href="#">Posgrados</a></li>
                                <li><a href="#">Programas tecnológicos UAOTEC</a></li>
                                <li><a href="#">Educación continua</a></li>
                                <li><a href="#">UAO Virtual</a></li>
                                <li><a href="#">Consultorías y asesorías empresariales</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Admisiones</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">Para pregrados</a></li>
                                <li><a href="#">Para posgrados</a></li>
                                <li><a href="#">Para programas tecnológicos UAOTEC</a></li>
                                <li><a href="#">Para educación continua</a></li>
                                <li><a href="#">Becas y financiación</a></li>
                                <li><a href="#">Opciones de transferencia y cambio</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Experimenta la UAO</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">¿Por qué estudiar en la UAO?</a></li>
                                <li><a href="#">Opciones de internacionalización</a></li>
                                <li><a href="#">Laboratorios UAO</a></li>
                                <li><a href="#">Actividades culturales y artísticas</a></li>
                                <li><a href="#">Nuestros medios UAO</a></li>
                                <li><a href="#">Nuestros museos UAO</a></li>
                                <li><a href="#">Agencia de noticias</a></li>
                                <li><a href="#">Agenda de eventos</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Investigación</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">¿Quiénes somos?</a></li>
                                <li><a href="#">Convocatorias de investigación</a></li>
                                <li><a href="#">Portafolio de tecnologías para transferencia</a></li>
                                <li><a href="#">Grupos de investigación</a></li>
                                <li><a href="#">Semilleros de Investigación</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Servicios Académicos</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">Servicios generales</a></li>
                                <li><a href="#">Ingreso a portales</a></li>
                                <li><a href="#">Centros de servicio</a></li>
                                <li><a href="#">Procesos y trámites administrativos</a></li>
                                <li><a href="#">Convenios asociados</a></li>
                                <li><a href="#">Instituto de idiomas</a></li>
                            </ul>
                        </li>
                        <li>
                            <div class="hmmbp-title">
                                <a href="">Bienestar</a>
                                <a class="hmmbpt-dropbtn" href=""><span class="icon fas fa-angle-down"></span></a>
                            </div>
                            <ul class="hmmbp-submenu">
                                <li><a href="#">Información y políticas</a></li>
                                <li><a href="#">Deporte y recreación</a></li>
                                <li><a href="#">Arte y cultura</a></li>
                                <li><a href="#">Formación integral</a></li>
                                <li><a href="#">CASA</a></li>
                                <li><a href="#">Transporte y movilidad</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="hmmb-language">
                        <p>Idioma:</p>
                        <a data-lang="es" id="hmmb-es" class="active" href="">Español</a>
                        <a data-lang="en" id="hmmb-en" href="">English</a>
                    </div>
                    <div class="hmmb-footer">
                        <ul class="hmmbf-legal">
                            <li><a href="">Política de Tratamiento de Datos Personales</a></li>
                            <li><a href="">Reglamento Estudiantil</a></li>
                            <li><a href="">Documentos legales</a></li>
                            <li><a href="">Transparencia y Acceso a la Información Pública</a></li>
                        </ul>
                        <div id="hmmbf-contact">
                            <h5>Contacto</h5>
                            <ul class="social-links">
                                <li><a href="" class="icon icon-Facebook"></a></li>
                                <li><a href="" class="icon icon-Twitter"></a></li>
                                <li><a href="" class="icon icon-Instagram"></a></li>
                                <li><a href="" class="icon icon-Youtube"></a></li>
                                <li><a href="" class="icon icon-Linkedin"></a></li>
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


