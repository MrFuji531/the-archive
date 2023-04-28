// components/SimilarVideos/SimilarVideos.jsx
import React from 'react';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';
import './SimilarVideos.css';

const SimilarVideos = ({ currentVideoId }) => {
  // Fetch similar videos and store them in a state variable
  // For now, we'll use dummy data
  const similarVideos = [
    {
      title: 'Video 1',
      person: 'Person 1',
      publishDate: new Date(),
      tags: ['tag1', 'tag2'],
      videoUrl: 'https://youtu.be/aK9fPNJqDlA',
    },
    // Add more videos...
  ];

  return (
    <div className="similar-videos">
      <h3>Similar</h3>
      {similarVideos.map((video, index) => (
        <VideoThumbnail key={index} {...video} />
      ))}
    </div>
  );
};

export default SimilarVideos;
