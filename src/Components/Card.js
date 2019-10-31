import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        const {nombreDimension, descripcion, cargando} = this.props;
        const datosCard = (
            <div className="card">
                <script type="application/ld+json"></script>
                <article class="news-card">
                    <a href="#">
                        <div class="nc-top">
                            <figure>
                                <img alt="UAO" src="https://pattern.uao.edu.co/images/example-image.jpg"></img>
                            </figure>
                            <div>
                                <p class="category-tag ">
                                    {nombreDimension} </p>
                                <time class="date-text">03 de Abril de 2019</time>
                            </div>
                        </div>
                        <p class="nc-title">
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