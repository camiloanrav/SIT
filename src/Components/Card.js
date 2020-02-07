import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        const {nombreDimension, descripcion, rutaimagen, cargando} = this.props;
        const datosCard = (
            <div className="card">
                <script type="application/ld+json"></script>
                <article className="news-card">
                    <a href="#">
                        <div className="nc-top">
                            <figure>
                                <img alt="UAO" src={rutaimagen}></img>
                            </figure>
                            <div>
                                <p style={{color:'red', fontFamily:'roboto', marginTop:'0.3em'}} /* className="category-tag " */>
                                    <i style={{marginRight:'0.3em'}} class="fas fa-angle-right"></i>
                                    {nombreDimension} </p>
                            </div>
                        </div>
                        <p className="nc-title">
                            {descripcion}
                        </p>
                    </a>
                </article>
            </div>
        );

        const mensajeCarga = <span className="d-flex m-auto">Cargando...</span>;

        return (
            <div>
                {cargando ? mensajeCarga : datosCard }
            </div>
        );
    };
};

Card.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default Card;