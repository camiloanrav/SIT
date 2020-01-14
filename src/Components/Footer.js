import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <footer>
                    <div className="main">
                        <div className="top-container ">
                            <div className="hashtag">
                                <p><span>#</span>SomosUAO</p>
                                <span className="bottom-line"></span>
                            </div>

                            <ul className="social-links">
                                <li><a href="" className="fab fa-facebook-square"></a></li>
                                <li><a href="" className="fab fa-twitter"></a></li>
                                <li><a href="" className="fab fa-instagram"></a></li>
                                <li><a href="" className="fab fa-youtube"></a></li>
                                <li><a href="" className="fab fa-linkedin"></a></li>
                            </ul>

                            <div className="info">
                                <div className="section">
                                    <p>Teléfono</p>
                                    <div className="flex-container">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-phone"></span>
                                        </div>
                                        <div className="right">
                                            <p>PBX:+ 2 318 8000</p>
                                            <p>Línea gratuita: 01 8000 91 34 35</p>
                                            <a href="">Ver directorio general &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="separator"></span>
                                <div className="section">
                                    <p>Correo Electrónico</p>
                                    <div className="flex-container">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-envelope"></span>
                                        </div>
                                        <div className="right">
                                            <a href="">buzon@uao.edu.co</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="separator"></span>
                                <div className="section">
                                    <p>Dirección de Campus principal</p>
                                    <div className="flex-container">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-university"></span>
                                        </div>
                                        <div className="right">
                                            <p>Cll 25 # 115-85</p>
                                            <p>Km 2 Vía Cali - Jamundi</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="separator"></span>
                                <div className="section">
                                    <p>Ciudad</p>
                                    <div className="flex-container">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-map-marker-alt"></span>
                                        </div>
                                        <div className="right">
                                            <p>Cali, Colombia</p>
                                            <p>Código Postal: 760030</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="contact-mobile">
                                <a className="list-btn" href="#">
                                    <div className="lb-text">
                                        Contacto
                                    </div>
                                    <div className="lb-arrow">
                                        <span className="icon fas fa-chevron-right"></span>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    <div className="end">
                        <div className="logos">
                            <figure className="gf-figure-logo">
                                <img src="https://pattern.uao.edu.co/images/UAO-logo-acreditacion.png" alt="UAO"></img>
                            </figure>
                        </div>

                        <div className="end-text" style={{ textAlign: 'left' }}>
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