import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoAyuda from '../Components/VideoAyuda';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import RecursosUtiles from '../Components/RecursosUtiles';
import Titulo from '../Components/Titulo';

var preguntas = [{"pregunta":'¿Cómo puedo descargar los datos a una base de datos o tabla Excel?',"respuesta":'Para descargar los datos, en estadísticas municipales, después de buscar un indicador, presionar el botón “Generar Excel” en la parte inferior de la gráfica, automáticamente se descargará el archivo.'},
                {"pregunta":'¿Si tengo inquietudes en las cifras o su interpretación a quién puedo acudir?',"respuesta":'Consulta el metadato que encuentras en la sección de estadísticas municipales deberá presionar el botón de “Metadatos”, este le abrirá un archivo donde está toda la información de los indicadores o ponte en contacto con el administrador.'},
                {"pregunta":'¿Cómo puedo colaborar con SER Pacífico?',"respuesta":'Para colaborar con SER Pacífico puede utilizar la sección de contacto para comunicarse con el encargado y hacerle saber su interés en el proyecto.'},
                {"pregunta":'¿Los datos, publicaciones y demás información de esta plataforma pueden ser utilizados libremente o tienen alguna restricción?',"respuesta":'Los datos pueden ser utilizados libremente, para más información ver los términos de uso.'},
                {"pregunta":'¿Puedo solicitar a los encargados de SER Pacífico asesoría para la realización de algún proyecto en mi comunidad?',"respuesta":'Si, puede comunicarse con el administrador para solicitar la asesoría.'},
            ];

class AyudaContainer extends Component {
    render() {
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Ayuda"></Titulo>
                <VideoAyuda></VideoAyuda>
                <div className="ayuda">
                    <div className="preguntasFrecuentes">
                        <h3>Preguntas frecuentes:</h3>
                        {
                            preguntas.map(pregunta => {
                                return(
                                    <div style={{marginBottom:"2em"}}>
                                        <div style={{display:"flex"}}>
                                            <div className="circle-icon">
                                                <span className="icon fas fa-angle-right"></span>
                                            </div>
                                            <p className="pregunta">{pregunta.pregunta}</p>
                                        </div>
                                        <p style={{marginLeft:'2.5em', textAlign:'left'}}>{pregunta.respuesta}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    
                    <RecursosUtiles></RecursosUtiles>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

AyudaContainer.propTypes = {

};

export default AyudaContainer;