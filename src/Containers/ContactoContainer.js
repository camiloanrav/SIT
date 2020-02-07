import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactoMenu from '../Components/ContactoMenu';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Titulo from '../Components/Titulo';
import axios from "axios";
const API_PATH = 'http://11.11.8.164/enviarcorreo/index.php';

class ContactoContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nombres: "",
            correo: "",
            mensaje: "",
            mailSent: false,
            error: null
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }


    handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: API_PATH,
            headers: { 'content-type': 'application/json' },
            data: this.state
        })
            .then(result => {
                console.log(result);
                if (result.status == 200) {
                    this.setState({
                        mailSent: true
                    })
                }
            })
            .catch(error => this.setState({ error: error.message }));
    }

    render() {

        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Contacto"></Titulo>
                <div className="contactoMenu">
                    <section className="signature" >
                        <div className="signature-wrap">
                            <div className="sw-info ">
                                {/*
                            <div className="signature-logo">
                                <figure>
                                    <img src="../../../images/UAO-logo-acreditacion.png" alt="UAO"></img>
                                </figure>
                            </div>
                            */}
                                <div className="sw-title">Universidad Autónoma de Occidente</div>
                                <ul>
                                    <li>
                                        <p>Director</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-user"></span>
                                            </div>
                                            <p>Decano: Hernán Montaño Motato</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Teléfono</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-phone"></span>
                                            </div>
                                            <p>PBX: +2 318 8000</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Correo electrónico</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-envelope"></span>
                                            </div>
                                            <p>
                                                <a href="mailto:buzon@uao.edu.co" target="_top">buzon@uao.edu.co</a>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Ubicación en Campus</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-map-marker-alt"></span>
                                            </div>
                                            <p>Edificio A</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Horario de Atención</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-clock"></span>
                                            </div>
                                            <p>Lunes a viernes de 9:00 a. m. a 4:30 p. m.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="sw-form">
                                {/* <div className="sw-form"> */}
                                <h5>¿Tienes algo qué contarnos?</h5>
                                <p>Cuéntanos completando el siguiente formulario.</p>
                                <form onSubmit={e => this.handleFormSubmit(e)}>
                                    <label className="cb-container">
                                        <input type="checkbox"></input>
                                        <p>Acepto las <a href="">Políticas de privacidad</a></p>
                                        <span className="icon far fa-square"></span>
                                    </label>

                                    <div className="input-form">
                                        <input id="sig-name" type="text" name="nombre" value={this.state.nombres} onChange={e => this.setState({ nombres: e.target.value })} required="required" />
                                        <label for="sig-name">Nombres</label>
                                        <p>Formato de nombre incorrecto</p>
                                    </div>

                                    <div className="input-form">
                                        <input id="sig-email" type="email" name="correo" value={this.state.correo} onChange={e => this.setState({ correo: e.target.value })} required="required" />
                                        <label for="sig-email">Correo electrónico</label>
                                        <p>Formato de correo incorrecto</p>
                                    </div>

                                    <div className="input-form">
                                        <textarea id="mensaje" name="mensaje" onChange={e => this.setState({ mensaje: e.target.value })} value={this.state.mensaje} cols="40" rows="6" required="required"></textarea>
                                        <label className="if-text-area" for="mensaje">Escribe tu mensaje</label>
                                        <p>Formato de nombre incorrecto</p>
                                    </div>

                                    <div className="form-captcha"></div>


                                    <button className="form-submit-btn" type="submit"  >
                                        Enviar mensaje
                                    </button>
                                    <div>
                                        {this.state.mailSent && <div class="text">
                                            <blockquote class="feature-text" >
                                                <div>Mensaje enviado exitosamente. Gracias por contactarnos</div>

                                            </blockquote>
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer></Footer>
            </div>
        );
    }
};

ContactoContainer.propTypes = {

};

export default ContactoContainer;