// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const {createThumbnails} = require("./thumbnailGenerator");

// admin.initializeApp();

// // Trigger the function when a new video is added to the Firestore collection
// exports.generateThumbnails = functions.firestore
//     .document("videos/{videoId}")
//     .onCreate(async (snap, context) => {
//       const videoData = snap.data();
//       const videoURL = videoData.videoURL;

//       try {
//         const thumbnailURLs = await createThumbnails(videoURL);

//         // Update the Firestore document with the generated thumbnail URLs
//         await admin
//             .firestore()
//             .collection("videos")
//             .doc(context.params.videoId)
//             .update({thumbnails: thumbnailURLs});

//         console.log("Thumbnails generated and saved successfully");
//       } catch (error) {
//         console.error("Error generating thumbnails:", error);
//       }
//     });
