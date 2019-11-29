import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';

import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Card from '../Components/Card';
import Mapa from '../Components/Mapa';
import Acercade from '../Components/Acercade';
import Acercade2 from '../Components/Acercade2';
import { getDimension } from '../utils/api';

import DemoCarousel from '../Components/DemoCarousel';

import dimensionAmbiental from '../dimensionAmbiental.JPG';
import dimensionEconomica from '../dimensionEconomica.jpeg';
import dimensionInstitucional from '../dimensionInstitucional.jpg';
import dimensionSocial from '../dimensionSocial.jpg';

class InicioContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargando: true,
            nombreDimension: null,
            descripcion: null,
            datos: []
        };
    }
    // const [gradient, setGradient] = useState("");
    render() {
        const {cargando, nombreDimension, descripcion} = this.state;
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                {/* Contenido principal */}
                {/* <AwesomeSlider cssModule={AwsSliderStyles}
                    infinite={true}
                    bullets={false}
                    transitionDelay={2}
                    organicArrows={false}
                    className="carrousel">
                    <div data-src={carrousel6}/>
                    <div data-src={carrousel2}/>
                    <div data-src={carrousel8}/>
                    <div data-src={carrousel4}/>
                    <div data-src={carrousel1}/>
                    <div data-src={carrousel7}/>
                    <div data-src={carrousel3}/>
                </AwesomeSlider> */}
                <DemoCarousel></DemoCarousel>

                <section className="investigation with-decoration">
                    <div className="cards">                     
                        {cargando ? 'Cargando...' : this.renderPosts()
                    } </div>

                </section>
                {/*<section class="circulation-of-links">
                </section>*/}
                <div className='cards'>
                    <Mapa></Mapa>
                    <Acercade2></Acercade2>
                </div>


                <Footer></Footer>
            </div>
        );
    }

    renderPosts = () => {
        const {datos} = this.state;
      

        return datos.map(card => {
            const {nombre, descripcion} = card;

            return (
                <Card nombreDimension={nombre}
                    descripcion={descripcion}/>
                    
            );
        });
    }
    async componentDidMount() {
        getDimension().then((res) => {
            this.setState({datos: res.data});
        }).catch((err) => console.log(err));

        this.setState({cargando:false});
    }
}
InicioContainer.propTypes = {};

export default InicioContainer;
