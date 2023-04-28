import React from 'react';

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({videoId, videoUrl}) => {
  // eslint-disable-next-line react/prop-types
  const isYouTubeVideo = videoUrl && videoUrl.includes('youtube.com');

  if (isYouTubeVideo) {
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    return (
      <div className="video-player">
        <iframe
          width="560"
          height="315"
          src={videoSrc}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay;
          clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    return (
      <div className="video-player">
        <video
          width="560"
          height="315"
          controls
          src={videoUrl}
          title="Video player"
        ></video>
      </div>
    );
  }
};

export default VideoPlayer;
