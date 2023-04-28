import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../PageContent.css';
import { firestore } from '../../firebase';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'; // Import the VideoPlayer component
import { collection, query, where, getDocs } from 'firebase/firestore';
import ShareIcon from '@mui/icons-material/Share';
import SimilarVideos from '../../components/SimilarVideos/SimilarVideos';
import './VideoPage.css'
import Comments from '../../components/Comments/Comments';





const VideoPage = () => {      
        const { videoId } = useParams();
      
        const [video, setVideo] = useState(null);

      
        useEffect(() => {
          const fetchVideo = async () => {
            const videoSnapshot = await getDocs(
              query(collection(firestore, 'videos'), where('videoId', '==', videoId))
            );
            if (!videoSnapshot.empty) {
              const videoDoc = videoSnapshot.docs[0];
              setVideo({ id: videoDoc.id, ...videoDoc.data() });
            }
          };
      
          fetchVideo();
        }, [videoId]);

        const formatTimestamp = (timestamp) => {
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
          };

  if (!video) {
    return <div>Loading...</div>;
  }

  const isYouTubeVideo = video.videoUrl.startsWith('https://youtu.be/');


  return (
    <div className="page-content">
        <div className="video-player-and-details">
        {isYouTubeVideo ? (
        <VideoPlayer videoId={video.videoId} />
      ) : (
        <VideoPlayer videoUrl={video.videoUrl} />
      )}            <div className="video-details">
                    <h2>{video.title}</h2>
                    <h4>{video.person}</h4>
                    <h5>{formatTimestamp(video.publishDate)} - {video.views} views</h5>
                    <div className="video-tags">
                        {video.tags.map((tag, index) => (
                        <span className="video-tag" key={index}>{index === 0 ? tag : `, ${tag}`}</span>
                        ))}
                    </div>
                </div>
                <div className="video-description">
                    <details>
                        <summary>Description</summary>
                        <p>{video.description}</p>
                    </details>
                </div>
                <div className="share-button">
                    <ShareIcon />
            </div>

            <Comments />
        </div>

            
        <div className="video-player-and-similar">
            <SimilarVideos currentVideoId={video.id} />
        </div>

    </div>
  );
};

export default VideoPage;
