import React from 'react';
import PropTypes from 'prop-types';

const Acercade = () => {
    return (
        <div>
            <div className="results-card" style={{'textAlign':'left', margin:'1em', paddingRight:'2em'}}>
                <div>
                    <p className="category-tag ">
                        ¿Qué es el SER Pacífico?
                    </p>
                    <h5 style={{'fontSize':'14px'}}>
                        SER PACIFICO, una iniciativa de la Universidad Autónoma de Occidente, la Facultad de Comunicación y Ciencias Sociales y el Grupo de Investigación Economía y Desarrollo (GIED) que tiene como propósito suministrar a los actores locales información útil y actualizada sobre las dimensiones Económica, Socio-Cultural, Ambiental e Institucional, con la finalidad de contribuir a impulsar la competitividad territorial y fortalecer la identidad de la Región Pacífico de Colombia.
                        
                        {/* SER PACIFICO es un Sistema de Información Territorial para la Región Pacífico de Colombia, conformada por los departamentos del Chocó, Valle del Cauca, Cauca y Nariño, y sus 178 municipios. */}
                    </h5>
                </div>
            </div>
            <div className="results-card" style={{'textAlign':'left', margin:'1em', paddingRight:'2em'}}>
                <div>
                    <p className="category-tag ">
                        ¿Qué puedo encontrar aquí?
                    </p>
                    
                    <h5 style={{'fontSize':'14px'}}>
                        Las iniciativas orientadas al fomento del desarrollo económico local y la competitividad territorial requieren disponer de información pertinente, actualizada y confiable para mejorar la efectividad de la planificación, ejecución y evaluación de las estrategias territoriales. Uno de los mecanismos para generar esta información y poder visualizarla de una manera más apropiada es un Sistema de Información Territorial, los cuales en la actualidad son elementos claves para la gestión de programas de desarrollo económico local y competitividad regional.
                        
                        {/* SER PACIFICO se ha propuesto convertirse en una de las alternativas principales como un repositorio, buscador y herramienta de visualización de indicadores municipales y departamentales para la Región Pacífico de Colombia. */} 
                    </h5>
                </div>
            </div>
        </div>
    );
};

Acercade.propTypes = {

};

export default Acercade;