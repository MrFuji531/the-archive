import React from 'react';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';
// import './VideoSection.css';

// eslint-disable-next-line react/prop-types
const VideoSection = ({title, videos}) => {
  return (
    <div className="video-section">
      <h3 className="video-section-title">{title}</h3>
      <div className="video-row">
        {/* eslint-disable-next-line react/prop-types */ }
        {videos.map((video) => (
          <VideoThumbnail
            key={video.id}
            title={video.title}
            person={video.person}
            publishDate={video.publishDate}
            tags={video.tags}
            videoUrl={video.videoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
