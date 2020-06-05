import React, {useState} from 'react';
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
    const [enviando, setEnviando] = useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [message, setMessage] = React.useState("");
    const descriptionElementRef = React.useRef(null);
    const handleClose = () => {
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
        e.preventDefault();
        let aux = {
            "correo":correo,
            "nombres":nombres,
            "mensaje":mensaje
        }
        if(politicas){
            setEnviando(true);
            postEmail('/enviarcorreo/index.php',aux).then(data => {
                console.log(data);
                if (data === 200) {
                    setMailSent(true);
                }else{
                    setError(true);
                }
                setEnviando(false);
            }).catch(error =>{
                setEnviando(false);
                console.log(error.message);
                setError(true);
            });
        }else{
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
                                            <p>Docente: Paula Andrea Garizado</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Teléfono</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-phone"></span>
                                            </div>
                                            <p>PBX. (57 -2) 318 8000 ext. 11541</p>
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
                                        <p>Acepto el <a href="#/" onClick={handleOpenDialog}>Tratamiento de datos personales.</a></p>
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
                                        { mailSent &&
                                            <div className="text">
                                                <blockquote class="feature-text" >
                                                    <div>Mensaje enviado exitosamente. Gracias por contactarnos.</div>

                                                </blockquote>
                                            </div>
                                        }
                                        {
                                            error != null ? 
                                            <div className="text">
                                                <blockquote class="feature-text" >
                                                    <div>Error al enviar el mensaje.</div>

                                                </blockquote>
                                            </div>
                                            :
                                            null
                                        }
                                        {
                                            enviando &&
                                            <div className="text">
                                                <blockquote class="feature-text" >
                                                    <div>Enviando...</div>

                                                </blockquote>
                                            </div>
                                        }
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
                    autoHideDuration={4000}
                    onClose={()=>{setOpenSnackbar(false)}}
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
                    <DialogTitle id="scroll-dialog-title">Autorización para el tratamiento de Datos Personales</DialogTitle>
                    <DialogContent dividers='paper'>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <p style={{fontFamily:'roboto'}}>
                        En mi calidad de titular de datos personales, al diligenciar de manera voluntaria este formulario y bajo el conocimiento de que no estoy obligado a hacerlo, autorizo a la Universidad Autónoma de Occidente a utilizar la información que a continuación suministrará con el propósito de que sea usada con el fin de proporcionar un servicio de calidad en mejoramiento continuo, mantener un registro de usuarios, atención de solicitudes, sugerencias respecto al Portal Institucional y la información contenida en él, mejorar el servicio prestado, adelantar la promoción y publicidad relacionada con productos y servicios académicos que ofrece la Universidad, promoción y publicidad de actividades desarrolladas por la Universidad o las instituciones con las cuales desarrolle eventos en asocio, la información podrá ser transmitida a instituciones y organizaciones con las cuales la Universidad ha establecido convenios para el desarrollo de actividades académicas y sociales. Conozco que la Universidad ha establecido su Política de Tratamiento y Protección de Datos Personales la cual puede ser consultada en el link http://www.uao.edu.co/la-universidad/aviso-de-privacidad. Así mismo tengo conocimiento de que podré conocer, modificar o suprimir la información aquí suministrada mediante comunicación dirigida a Secretaría General - Protección de Datos - Universidad Autónoma de Occidente a la  dirección Calle 25 # 115-85 Km 2 Vía Cali – Jamundí,  o a través de correo un electrónico dirigido a la dirección datospersonales@uao.edu.co.
                        </p>
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

export default ContactoContainer;