import React from 'react';
import './VideoThumbnail.css'
import { Link } from 'react-router-dom';


const VideoThumbnail = ({ title, person, publishDate, tags, videoUrl }) => {

 function formatTimestamp(timestamp) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInWeeks / 4);
    const diffInYears = Math.floor(diffInMonths / 12);
  
    if (diffInYears > 0) return `${diffInYears} years ago`;
    if (diffInMonths > 0) return `${diffInMonths} months ago`;
    if (diffInWeeks > 0) return `${diffInWeeks} weeks ago`;
    if (diffInDays > 0) return `${diffInDays} days ago`;
    if (diffInHours > 0) return `${diffInHours} hours ago`;
    return 'New';
  }
  

  const getVideoId = (url) => {
    if (!url) return ''; //
    const videoIdRegex = /youtu\.be\/(.+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="video-thumbnail">
      <Link to={`/video/${videoId}`}>
        <img src={thumbnailUrl} alt={`${title} thumbnail`} />
      </Link>
      <div className="video-info">
      <Link to={`/video/${videoId}`} className="video-title-link">
        <h4 className="video-title">{title}</h4>
      </Link>
      <h5 className="video-person">{person}</h5>
      <h6 className="video-publish-date">{formatTimestamp(publishDate)} - 1000 view</h6>
      {tags.map((tag, index) => (
          <span className="video-tag" key={index}>{index === 0 ? tag : `, ${tag}`}</span>
        ))}
      </div>
    </div>
  );
};

export default VideoThumbnail;
