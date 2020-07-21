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
                                <li><a target="_blank" rel="noopener noreferrer" href="https://es-la.facebook.com/universidadautonomadeoccidente/" className="fab fa-facebook-square"></a></li>
                                <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/lauao" className="fab fa-twitter"></a></li>
                                <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/universidadautonomadeoccidente/?hl=es-la" className="fab fa-instagram"></a></li>
                                <li><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCakpB12sFykpJY6lqImL5uQ" className="fab fa-youtube"></a></li>
                                <li><a target="_blank" rel="noopener noreferrer" href="https://co.linkedin.com/school/universidadautonomadeoccidente/" className="fab fa-linkedin"></a></li>
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
                                            {/* <a href="">buzon@uao.edu.co</a> */}
                                            <p>buzon@uao.edu.co</p>
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
                    <DialogTitle id="scroll-dialog-title">Términos de uso del Portal Institucional SER Pacífico</DialogTitle>
                    <DialogContent dividers='paper'>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >


                    <p style={{fontFamily:'roboto'}}>
                        El uso de la información contenida en este Portal Institucional implica que cada usuario acepta las siguientes condiciones de uso:
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        1. La Universidad Autónoma de Occidente desde el Grupo de Investigación Economía y Desarrollo ha diseñado este portal con el objetivo fomentar el desarrollo económico local y la competitividad territorial de la Región Pacífico de Colombia, suministrando a los actores locales, información útil y actualizada sobre las dimensiones Económica, Socio-Cultural, Ambiental e Institucional, con la finalidad de mejorar la planificación, ejecución y evaluación de estrategias municipales y fortalecer la identidad de la Región Pacífico de Colombia. Los datos que aquí se suministran provienen de múltiples fuentes secundarias, las cuales están protegidas por la Ley y por la jurisprudencia colombiana bajo el concepto de Reserva Estadística, es decir que los datos estadísticos publicados consistirán en resultados y resúmenes numéricos una vez la información estadística en sí misma sea objeto de análisis y tratamiento, de los cuales no se pueda deducir información individual y/o datos personales con fines diferentes a la presentación de esta información con el propósito mismo de este numeral. La Universidad se reserva el derecho a modificar estas condiciones de licencia para la información en cualquier momento y sin previo aviso.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        2. La Universidad hará un adecuado manejo, procesamiento y divulgación de la información que publique en la página de internet, garantizando el ejercicio pleno de los derechos fundamentales de sus lectores y usuarios.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        3. Cuando la información que publique sea inexacta o errónea, el interesado podrá solicitar la rectificación de dicha información en condiciones de equidad, siempre que se demuestre en debida forma que dicha información detenta la condición de inexacta o errónea.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        4. Se podrá hacer uso, transformación, distribución, redistribución, reutilización, compilación, extracción, copia, difusión, modificación y/o adaptación de los datos y de la información publicados en este portal, siempre y cuando se haga la siguiente cita textual en atención al respeto de los derechos morales y patrimoniales de propiedad intelectual: Fuente: Universidad Autónoma de Occidente: www.uao.edu.co/serpacifico. En todo caso debe citarse la fuente de los datos externo objeto del uso, rehúso y/o transformación.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        5. Está prohibido el uso no autorizado de material protegido por las normas sobre propiedad intelectual o de protección de datos personales.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        6. La entidad productora de los datos publicados no será responsable de la utilización que de sus datos hagan las personas que transformen y/o usen dichos datos, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos y aplicaciones, provocados por el uso y/o transformación de los datos.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        7. Esta licencia de uso se rige por la legislación colombiana.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        8. Los datos y la información en general que aparecen en este portal se han introducido siguiendo estrictos procedimientos de control de calidad. No obstante, la Universidad Autónoma de Occidente no se responsabiliza por el uso e interpretación realizado por los usuarios.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        9. Corresponderá al usuario conceder un uso adecuado al Portal Institucional y la información consignada en él, haciéndolo para fines lícitos y conformes a la misión de fomento del desarrollo económico local y la competitividad territorial de la Región Pacífico de Colombia. El usuario se abstendrá de realizar un uso contrario a la ley y a las buenas costumbres, que vulnere los derechos de La Universidad Autónoma de Occidente o de terceros y demás bienes jurídicos protegidos por las normas aplicables, so pena de las consecuencias estipuladas en éstas.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        10. El uso del Portal Institucional es responsabilidad de los usuarios, por lo que se prohíbe el uso de éste con el fin de realizar acciones constitutivas de acoso, difamación, calumnias, intimidaciones, insultos o cualquier otra forma de actuación hostil y, en general, conductas constitutivas de delitos informáticos o delitos haciendo uso de medios informáticos. En dichos casos, La Universidad Autónoma de Occidente adelantará las acciones que sean de su resorte a nivel institucional y colaborará en la investigación de este tipo de actos que lleven a cabo las autoridades competentes.
                    </p>
                    <br></br>
                    <p style={{fontFamily:'roboto'}}>
                        11. Se encuentra prohibida la utilización, salvo autorización de La Universidad Autónoma de Occidente, del nombre, razón social, símbolo, logo institucional, imagen corporativa, marcas, nombres de dominio, signos distintivos y demás activos de propiedad intelectual de La Universidad o de terceros que se utilicen en el Portal Institucional, para fines publicitarios, comerciales o de cualquier otra índole, sin perjuicio del otorgamiento de los créditos correspondientes en la citación del material descargado de que trata el numeral 5 precedente.
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