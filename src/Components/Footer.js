import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <footer>
                    <div class="main">
                        <div class="top-container ">
                            <div class="hashtag">
                                <p><span>#</span>SomosUAO</p>
                                <span class="bottom-line"></span>
                            </div>

                            <ul class="social-links">
                                <li><a href="" class="fab fa-facebook-square"></a></li>
                                <li><a href="" class="fab fa-twitter"></a></li>
                                <li><a href="" class="fab fa-instagram"></a></li>
                                <li><a href="" class="fab fa-youtube"></a></li>
                                <li><a href="" class="fab fa-linkedin"></a></li>
                            </ul>

                            <div class="info">
                                <div class="section">
                                    <p>Teléfono</p>
                                    <div class="flex-container">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-phone"></span>
                                        </div>
                                        <div class="right">
                                            <p>PBX:+ 2 318 8000</p>
                                            <p>Línea gratuita: 01 8000 91 34 35</p>
                                            <a href="">Ver directorio general &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <span class="separator"></span>
                                <div class="section">
                                    <p>Correo Electrónico</p>
                                    <div class="flex-container">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-envelope"></span>
                                        </div>
                                        <div class="right">
                                            <a href="">buzon@uao.edu.co</a>
                                        </div>
                                    </div>
                                </div>
                                <span class="separator"></span>
                                <div class="section">
                                    <p>Dirección de Campus principal</p>
                                    <div class="flex-container">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-university"></span>
                                        </div>
                                        <div class="right">
                                            <p>Cll 25 # 115-85</p>
                                            <p>Km 2 Vía Cali - Jamundi</p>
                                        </div>
                                    </div>
                                </div>
                                <span class="separator"></span>
                                <div class="section">
                                    <p>Ciudad</p>
                                    <div class="flex-container">
                                        <div class="circle-icon">
                                            <span class="icon fas fa-map-marker-alt"></span>
                                        </div>
                                        <div class="right">
                                            <p>Cali, Colombia</p>
                                            <p>Código Postal: 760030</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="contact-mobile">
                                <a class="list-btn" href="#">
                                    <div class="lb-text">
                                        Contacto
                    </div>
                                    <div class="lb-arrow">
                                        <span class="icon icon-chevron-right"></span>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    <div class="end">
                        <div class="logos">
                            <figure class="gf-figure-logo">
                                <img src="https://pattern.uao.edu.co/images/UAO-logo-acreditacion.png" alt="UAO"></img>
                            </figure>
                        </div>

                        <div class="end-text" style={{ textAlign: 'left' }}>
                            <p>Personería jurídica, Res. No. 0618, de la Gobernación del Valle del Cauca, del 20 de febrero de 1970.<br></br>
                                Universidad Autónoma de Occidente, Res. No. 2766, del Ministerio de Educación Nacional, del 13 de noviembre de 2003.<br></br>
                                Acreditación Institucional de Alta Calidad, Res. No. 16740, del 24 de agosto de 2017, con vigencia hasta el 2021.<br></br>
                                Universidad Vigilada MinEducación</p>

                            <p>La Universidad Autónoma de Occidente está sujeta a inspección y vigilancia por el Ministerio de Educación Nacional - Artículo 39 del decreto 1295 de 2010</p>
                        </div>
                    </div>

                </footer>
            </div>
        </div>
    );
};

Footer.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default Footer;