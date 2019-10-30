import React from 'react';
import PropTypes from 'prop-types';

const VideoAyuda = () => {
    return (
        <div>
            <section class="video-section">
                <div class="vs">
                    <h1 class="section-title">
                        Video guía
                    </h1>
                    <div class="vs-wrap">
                    <div class="vs-container">
                        <iframe src="https://www.youtube.com/embed/dvVOFNpando" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

VideoAyuda.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default VideoAyuda;