import React from 'react';
import PropTypes from 'prop-types';

const ContactoMenu = () => {
    return (
        <div>
            <div className="contactoMenu">
                <section class="signature" >
                    <div class="signature-wrap">
                        <div class="sw-info ">
                            {/*
                            <div class="signature-logo">
                                <figure>
                                    <img src="../../../images/UAO-logo-acreditacion.png" alt="UAO"></img>
                                </figure>
                            </div>
                            */}
                        <div class="sw-title">Universidad Autónoma de Occidente</div>
                        <ul>
                            <li>
                            <p>Director</p>
                            <div>
                                <div class="circle-icon">
                                    <span class="icon fas fa-user"></span>
                                </div>
                                <p>Decano: Hernán Montaño Motato</p>
                            </div>
                            </li>
                            <li>
                            <p>Teléfono</p>
                            <div>
                                <div class="circle-icon">
                                    <span class="icon fas fa-phone"></span>
                                </div>
                                <p>PBX: +2 318 8000</p>
                            </div>
                            </li>
                            <li>
                            <p>Correo electrónico</p>
                            <div>
                                <div class="circle-icon">
                                    <span class="icon fas fa-envelope"></span>
                                </div>
                                <p>
                                <a href="mailto:buzon@uao.edu.co" target="_top">buzon@uao.edu.co</a>
                                </p>
                            </div>
                            </li>
                            <li>
                            <p>Ubicación en Campus</p>
                            <div>
                                <div class="circle-icon">
                                    <span class="icon fas fa-map-marker-alt"></span>
                                </div>
                                <p>Edificio A</p>
                            </div>
                            </li>
                            <li>
                            <p>Horario de Atención</p>
                            <div>
                                <div class="circle-icon">
                                    <span class="icon fas fa-clock"></span>
                                </div>
                                <p>Lunes a viernes de 9:00 a. m. a 4:30 p. m.</p>
                            </div>
                            </li>
                        </ul>
                        </div>
                        <div class="sw-form">
                        <h5>¿Tienes algo qué contarnos?</h5>
                        <p>Cuéntanos completando el siguiente formulario.</p>
                        <form>
                            <label class="cb-container">
                                <input type="checkbox"></input>
                                <p>Acepto las <a href="">Políticas de privacidad</a></p>
                                <span class="icon far fa-square"></span>
                            </label>

                            <div class="input-form">
                                <input id="sig-name" type="text" name="nombre" value="" required="required"/>
                                <label for="sig-name">Nombres</label>
                                <p>Formato de nombre incorrecto</p>
                            </div>
                                    
                            <div class="input-form">
                                <input id="sig-email" type="email" name="correo" value="" required="required"/>
                                <label for="sig-email">Correo electrónico</label>
                                <p>Formato de correo incorrecto</p>
                            </div>
                
                            <div class="input-form">
                                <textarea id="mensaje" name="mensaje" cols="40" rows="6" required="required"></textarea>
                                <label class="if-text-area" for="mensaje">Escribe tu mensaje</label>
                            <p>Formato de nombre incorrecto</p>
                            </div>

                            <div class="form-captcha"></div>
                                    
                            <button class="form-submit-btn" disabled>
                                Enviar mensaje
                            </button>
                        </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

ContactoMenu.propTypes = {
    
};

export default ContactoMenu;