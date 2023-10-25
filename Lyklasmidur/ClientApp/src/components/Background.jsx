import React, { useEffect } from 'react';

const Background = () => {
    return (
        <div className="background-container" onContextMenu={ e => e.preventDefault() }>
            <video id="background-video" autoPlay loop muted poster="backgrounds/clouds_01.png">
                <source src="backgrounds/clouds_01_m.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export { Background };