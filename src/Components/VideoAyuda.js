import React from 'react';

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
                        <iframe src="https://www.youtube.com/embed/BPjlcRMTUBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VideoAyuda;