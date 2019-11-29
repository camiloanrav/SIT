import React from 'react';
import PropTypes from 'prop-types';

const VideoAyuda = () => {
    return (
        <div>
            <section className="video-section">
                <div className="vs">
                    <h1 className="section-title">
                        Video guía
                    </h1>
                    <div className="vs-wrap">
                    <div className="vs-container">
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