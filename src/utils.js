import { doc, updateDoc, increment } from 'firebase/firestore';
import { firestore } from './firebase'; // Adjust the import path accordingly

export const incrementViewCount = async (videoId) => {
  const videoRef = doc(firestore, 'videos', videoId);
  await updateDoc(videoRef, { viewCount: increment(1) });
};
