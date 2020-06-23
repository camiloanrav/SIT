import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Footer = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const descriptionElementRef = React.useRef(null);

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

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
                                            {/* <a href="">Ver directorio general &gt;</a> */}
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
                                <span className="separator"></span>
                                <div className="section">
                                    <p>Términos de uso SER Pácífico</p>
                                    <div className="flex-container">
                                        <div className="circle-icon">
                                            <span className="icon fas fa-bookmark"></span>
                                        </div>
                                        <div  className="right">
                                            {/* <p>PBX:+ 2 318 8000</p>
                                            <p>Línea gratuita: 01 8000 91 34 35</p> */}
                                            <a style={{color:'#ff1744'}} onClick={handleOpenDialog} href="#/">Ver términos de uso &gt;</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="contact-mobile">
                                <a onClick={handleOpenDialog} className="list-btn" href="#/">
                                    <div className="lb-text">
                                        Términos de uso
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
            <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Términos de uso SER Pacífico</DialogTitle>
                    <DialogContent dividers='paper'>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >


                    <p style={{fontFamily:'roboto'}}>
                        El uso de la información contenida en este portal institucional implica que cada usuario acepta las siguientes condiciones de uso:
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        1. La Universidad Autónoma de Occidente desde el Grupo de Investigación Economía y Desarrollo ha diseñado este portal con el objetivo fomentar el desarrollo económico local y la competitividad territorial suministrando a los actores locales, información útil y actualizada sobre las dimensiones Económica, Socio-Cultural, Ambiental e Institucional, con la finalidad de mejorar la planificación, ejecución y evaluación de estrategias municipales y fortalecer la identidad de la Región Pacífico de Colombia.  Los datos que aquí se suministran provienen de multiples fuentes secundarias, las cuales están protegidos por la Ley y por la jurisprudencia colombiana bajo el concepto de Reserva Estadística. La Universidad se reserva el derecho a modificar estas condiciones de licencia para la información en cualquier momento y sin previo aviso.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        2. Se podrá hacer uso, transformación, distribución, redistribución, reutilización, compilación, extracción, copia, difusión, modificación y/o adaptación de los datos  y de la información publicados en este portal, siempre y cuando se haga la siguiente cita textual: Fuente: Universidad Autónoma de Occidente: www.uao.edu.co/serpacifico. En todo caso debe citarse la fuente de los datos externo objeto del uso, rehúso y/o transformación.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        3. La entidad productora de los datos publicados no será responsable de la utilización que de sus datos hagan las personas que transformen y/o usen dichos datos, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos y aplicaciones, provocados por el uso y/o transformación de los datos.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        4. Esta licencia de uso se rige por la legislación colombiana.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        5. Los datos y la información en general que aparecen en este portal se han introducido siguiendo estrictos procedimientos de control de calidad. No obstante, la Universidad Autónoma de Occidente no se responsabiliza por el uso e interpretación realizado por terceros.
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
};

export default Footer;