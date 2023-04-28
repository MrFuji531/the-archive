import React, {useEffect, useState} from 'react';
import './WelcomePage.css';
import '../../PageContent.css';
import {firestore} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';
import VideoSection from '../../components/VideoSection/VideoSection';

const WelcomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollection = await getDocs(collection(firestore, 'videos'));
      setVideos(videoCollection.docs.map((doc) =>
        ({id: doc.id, ...doc.data()})));
    };

    fetchVideos();
  }, []);

  // Slice the videos array to display only the first 4 videos in each category
  const featuredVideos = videos.slice(0, 4);
  const newVideos = videos.slice(0, 4);
  const popularVideos = videos.slice(0, 4);

  return (
    <div className="page-content">
      <div className="welcome-page">
        <h1 className="welcome-title">The Archive</h1> {/* Add main title */}
        <h2 className="welcome-subheading">
          A place to preserve and share our stories</h2>

        <div className="video-section">
          <VideoSection title="Featured" videos={featuredVideos} />
          <VideoSection title="New" videos={newVideos} />
          <VideoSection title="Popular" videos={popularVideos} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
