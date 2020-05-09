import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ContactoMenu from '../Components/ContactoMenu';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Titulo from '../Components/Titulo';
import { postEmail } from '../utils/api';
import Checkbox from '@material-ui/core/Checkbox';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ContactoContainer = () => {


    /* constructor(props) {
        super(props);
        this.state = {
            nombres: "",
            correo: "",
            mensaje: "",
            mailSent: false,
            error: null,
            politicas: null,
        }
    } */
    const [nombres, setNombres] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mailSent, setMailSent] = useState(false);
    const [error, setError] = useState(null);
    const [politicas, setPoliticas] = useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [message, setMessage] = React.useState("");
    const descriptionElementRef = React.useRef(null);
    const handleClose = () => {
        setOpenSnackbar(false);
        setOpenDialog(false);
    };

    const handleOpenSnackbar = (message) => {
        setMessage(message);
        setOpenSnackbar(true);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleChangeCheckBox = (p) =>{
        setPoliticas(!p);
    };

    /* const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    } */

    const handleFormSubmit = e => {
        if(politicas){
            e.preventDefault();
            postEmail('/enviarcorreo/index.php',this.state).then(data => {
                console.log(data);
                if (data === 200) {
                    setMailSent(true);
                }
            }).catch(error => setError(error.message));
        }else{
            //alert("Primero debe aceptar las políticas de privacidad");
            handleOpenSnackbar("Primero debe aceptar las políticas de privacidad");
        }
    }

    React.useEffect(() => {
        if (openDialog) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [openDialog]);


        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Contacto"></Titulo>
                <div className="contactoMenu">
                    <section className="signature" >
                        <div className="signature-wrap">
                            <div className="sw-info">
                                {/*
                            <div className="signature-logo">
                                <figure>
                                    <img src="../../../images/UAO-logo-acreditacion.png" alt="UAO"></img>
                                </figure>
                            </div>
                            */}
                                <div className="sw-title">SER Pacífico</div>
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
                                                <a href="mailto:buzon@uao.edu.co" target="_top">serpacifico@uao.edu.co</a>
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
                                <form onSubmit={e => handleFormSubmit(e)}>
                                    <label className="cb-container">
                                        {/* <input type="checkbox"></input> */}
                                        <Checkbox
                                            checked={politicas}
                                            onChange={() => handleChangeCheckBox(politicas)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <p>Acepto las <a href="#/" onClick={handleOpenDialog}>Políticas de privacidad</a></p>
                                        {/* <span className="icon far fa-square"></span> */}
                                    </label>

                                    <div className="input-form">
                                        <input id="sig-name" type="text" name="nombre" value={nombres} onChange={e => setNombres(e.target.value)} required="required" />
                                        <label for="sig-name">Nombres</label>
                                        <p>Formato de nombre incorrecto</p>
                                    </div>

                                    <div className="input-form">
                                        <input id="sig-email" type="email" name="correo" value={correo} onChange={e => setCorreo(e.target.value)} required="required" />
                                        <label for="sig-email">Correo electrónico</label>
                                        <p>Formato de correo incorrecto</p>
                                    </div>

                                    <div className="input-form">
                                        <textarea id="mensaje" name="mensaje"  onChange={e => setMensaje(e.target.value)} value={mensaje} cols="40" rows="6" required="required"></textarea>
                                        <label className="if-text-area" for="mensaje">Escribe tu mensaje</label>
                                        <p>Formato de nombre incorrecto</p>
                                    </div>

                                    {/* <div className="form-captcha"></div> */}


                                    <button className="button-card-uao" type="submit"  >
                                        Enviar mensaje
                                        <i class="fas fa-chevron-right" style={{marginLeft:'1em'}}></i>
                                    </button>
                                    <div>
                                        {mailSent && <div class="text">
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

                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={openSnackbar}
                    autoHideDuration={8000}
                    onClose={handleClose}
                    message={message}
                    action={
                        <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        </React.Fragment>
                    }
                />
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Políticas de privacidad</DialogTitle>
                    <DialogContent dividers='paper'>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CERRAR
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

ContactoContainer.propTypes = {

};

export default ContactoContainer;