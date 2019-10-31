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
import { getDimension } from '../utils/api';

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
                <AwesomeSlider cssModule={AwsSliderStyles}
                    infinite={true}
                    bullets={false}
                    transitionDelay={2}
                    organicArrows={false}
                    className="carrousel">
                    <div data-src="https://www.tuexperto.com/wp-content/uploads/2017/10/fondo-de-pantalla-paisaje.jpg"/>
                    <div data-src="http://3.bp.blogspot.com/-p2_y6LEfNZw/VXdizrIH5qI/AAAAAAAAAGQ/DwiP8tr9D4Y/s1600/pre5.jpg"/>
                    <div data-src="https://s2.best-wallpaper.net/wallpaper/1920x1080/1112/Tropical-beach_1920x1080.jpg"/>
                </AwesomeSlider>

                <section class="investigation with-decoration">
                    <div className="cards">                     
                        {cargando ? 'Cargando...' : this.renderPosts()
                    } </div>

                </section>
                {/*<section class="circulation-of-links">
        </section>*/}
                <div className='cards'>
                    <Mapa></Mapa>
                    <Acercade></Acercade>
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
