import React, { useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };


    return (
        <div className="video-container">
            <h2>Watch this video</h2>


            <YouTube
                videoId={videoId}
                opts={opts}
                onError={handleError}
            />
        </div>
    );
};

export default VideoPlayer;
