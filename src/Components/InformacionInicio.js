import React from 'react';
import logo from '../logo-ser-2.png';

const InformacionInicio = () => {
    return (
        <div>
            <img style={{marginTop:'4em'}} alt="logo" src={logo} width="380em"></img>
            <div className="informacion">
                    <p>
                        <i className="fas fa-angle-right"></i>
                        ¿QUIÉNES SOMOS?
                    </p>
                    <div>
                        SER PACÍFICO, una iniciativa de la Universidad Autónoma de Occidente, la Facultad de Comunicación y Ciencias Sociales y el Grupo de Investigación Economía y Desarrollo (GIED), tiene como propósito el fomento del desarrollo económico local y la competitividad territorial suministrando a los actores locales información útil y actualizada sobre las dimensiones Económica, Socio-Cultural, Ambiental e Institucional, con la finalidad de mejorar la planificación, ejecución y evaluación de estrategias municipales y fortalecer la identidad de la Región Pacífico de Colombia.
                    </div>
            </div>
        </div>
        
    );
};

export default InformacionInicio;