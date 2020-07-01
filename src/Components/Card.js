import React from 'react';

import { NavLink} from 'react-router-dom';

class Card extends React.Component {
    
    render() {
        const {nombreDimension, descripcion, rutaimagen, cargando, i} = this.props;
        var url = '/ser/estadisticas/busqueda-por-dimensiones/' + i;
        const datosCard = (
            <div className="card">
                <script type="application/ld+json"></script>
                <article className="news-card">
                    <NavLink to={url}>
                        <div className="nc-top">
                            <figure>
                                <img alt="UAO" src={rutaimagen}></img>
                            </figure>
                            <div>
                                <p style={{color:'red', fontFamily:'roboto', marginTop:'0.3em'}} /* className="category-tag " */>
                                    <i style={{marginRight:'0.3em'}} className="fas fa-angle-right"></i>
                                    {nombreDimension} </p>
                            </div>
                        </div>
                        <p className="nc-title">
                            {descripcion}
                        </p>
                    </NavLink>
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

export default Card;