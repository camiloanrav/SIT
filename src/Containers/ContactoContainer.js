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
                
                if (data === 200) {
                    setMailSent(true);
                }else{
                    setError(true);
                }
                setEnviando(false);
            }).catch(error =>{
                setEnviando(false);
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
                                <div className="sw-title">SER Pacífico</div>
                                <ul>
                                    {/* <li>
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
                                    </li> */}
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
                                    {/* <li>
                                        <p>Ubicación en Campus</p>
                                        <div>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-map-marker-alt"></span>
                                            </div>
                                            <p>Edificio Ala Norte</p>
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
                                    </li> */}
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
                        {/* En mi calidad de titular de datos personales, al diligenciar de manera voluntaria este formulario y bajo el conocimiento de que no estoy obligado a hacerlo, autorizo a la Universidad Autónoma de Occidente a utilizar la información que a continuación suministrará con el propósito de que sea usada con el fin de proporcionar un servicio de calidad en mejoramiento continuo, mantener un registro de usuarios, atención de solicitudes, sugerencias respecto al Portal Institucional y la información contenida en él, mejorar el servicio prestado, adelantar la promoción y publicidad relacionada con productos y servicios académicos que ofrece la Universidad, promoción y publicidad de actividades desarrolladas por la Universidad o las instituciones con las cuales desarrolle eventos en asocio, la información podrá ser transmitida a instituciones y organizaciones con las cuales la Universidad ha establecido convenios para el desarrollo de actividades académicas y sociales. Conozco que la Universidad ha establecido su Política de Tratamiento y Protección de Datos Personales la cual puede ser consultada en el link http://www.uao.edu.co/la-universidad/aviso-de-privacidad. Así mismo tengo conocimiento de que podré conocer, modificar o suprimir la información aquí suministrada mediante comunicación dirigida a Secretaría General - Protección de Datos - Universidad Autónoma de Occidente a la  dirección Calle 25 # 115-85 Km 2 Vía Cali – Jamundí,  o a través de correo un electrónico dirigido a la dirección datospersonales@uao.edu.co. */}
                        Se protegerá la información que eventualmente sea proporcionada por los usuarios al momento de utilizar el Portal Institucional, de conformidad con la Ley Estatutaria 1581 de 2012, los Decretos 1377 de 2013 y 886 de 2014, la Política de Tratamiento y Protección de Datos Personales de la Universidad https://www.uao.edu.co/sites/default/files/resoluciones/Resolucion-586-de2018.pdf, y demás normas aplicables. La Política de Tratamiento y Protección de Datos Personales referida y los términos de uso de este Portal Institucional, podrá ser objeto de modificación o actualización, por lo que se recomienda revisar periódicamente esta página y la referida política, para asegurarse que está de acuerdo con dichos cambios.
                        </p>
                        <br/>
                        <p style={{fontFamily:'roboto', fontWeight:'bold'}}>
                        Seguridad de la Información:
                        </p>
                        <p style={{fontFamily:'roboto'}}>
                        Se hará uso de plataformas avanzadas de seguridad y gestión de accesos que propendan a la confidencialidad, integridad y disponibilidad de la información que en su totalidad utilice el Portal Institucional. No obstante, el usuario acepta y conoce que la Universidad no será responsable por cualquier tipo de falla incluida pero no limitada a la falta de disponibilidad en los servicios, errores técnicos y/o violación de la seguridad de los sistemas que se encuentren por fuera de su control.
                        </p>
                        <br/>
                        <p style={{fontFamily:'roboto', fontWeight:'bold'}}>
                        Enlaces a Terceros:
                        </p>
                        <p style={{fontFamily:'roboto'}}>
                        El Portal Institucional puede contener enlaces a otros sitios web que puedan ser de interés de los usuarios. Una vez que el usuario dé clic en estos enlaces y abandone el Portal Institucional, este último no tendrá control sobre dichos sitios al que el usuario es redirigido, y por lo tanto no será responsable de los términos de uso, el tratamiento de información, la política de privacidad ni de la protección de sus datos en esos otros sitios web de terceros. Dichos sitios están sujetos a sus propias políticas de uso y privacidad, por lo cual es recomendable que los consulte para confirmar que el usuario está de acuerdo con dichas políticas
                        </p>
                        <br/>
                        <p style={{fontFamily:'roboto', fontWeight:'bold'}}>
                        Control de su información personal:
                        </p>
                        <p style={{fontFamily:'roboto'}}>
                        En cualquier momento, el usuario podrá restringir la recopilación o el uso de la información personal que es proporcionada al Portal Institucional. Cada vez que le sea solicitado al usuario diligenciar un formulario, como el de creación de usuarios, puede marcar o desmarcar la opción de recibir información por correo electrónico. En caso de que haya marcado la opción de recibir información, el usuario podrá cancelar la suscripción en cualquier momento. La información personal que eventualmente sea captada por el Portal Institucional, no se revelará, no se venderá, no se cederá, ni se distribuirá sin su consentimiento, salvo que sea requerida por orden de autoridad competente u opere alguna otra causal para ello, de conformidad con la Ley Estatutaria de Protección de Datos Personales 1581 de 2012, y demás normas que la complementen, modifiquen o adicionen.
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