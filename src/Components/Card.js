import React from 'react';
import PropTypes from 'prop-types';

const Card = ({nombreDimension}) => {
    return (
        <div>
            <div className="card">
                <script type="application/ld+json">
                </script>
                <article class="news-card">
                    <a href="#">
                        <div class="nc-top">
                            <figure>
                                <img src="https://pattern.uao.edu.co/images/example-image.jpg" alt="UAO"></img>
                            </figure>
                            <div>
                                <p class="category-tag ">
                                    {nombreDimension}
                                </p>
                                <time class="date-text">03 de Abril de 2019</time>
                            </div>
                        </div>
                        <p class="nc-title">
                            Ingeniería mecánica: 45 años formando ingenieros líderes para los desafíos de la región
                        </p>
                    </a>
                </article>
            </div>
        </div>
    );
};

Card.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default Card;