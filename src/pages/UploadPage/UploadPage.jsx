// UploadPage.jsx
import React, {useState} from 'react';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {auth} from '../../firebase'; // Import your existing firebase config
import {Container, Card,
  CardContent, TextField, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {WithContext as ReactTags} from 'react-tag-input';
import '../../react-tag-input-styles.css';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    padding: theme.spacing(3),
    maxWidth: '600px',
    width: '100%',
  },
  form: {
    'display': 'flex',
    'flexDirection': 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));


const UploadPage = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [person, setPerson] = useState('');
  const [tags, setTags] = useState([{id: '1', text: 'example'}]);
  const [file, setFile] = useState(null);
  const storage = getStorage();
  const firestore = getFirestore();
  const navigate = useNavigate();


  const handleDelete = (i) => {
    const newTags = tags.filter((tag, index) => index !== i);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please choose a video file');
      return;
    }

    try {
      // Upload the video file to Firebase Storage
      const storageRef = ref(storage, `videos/${file.name}`);
      await uploadBytes(storageRef, file);
      const videoURL = await getDownloadURL(storageRef);

      // Save the metadata to Firestore
      const videoData = {
        title,
        description,
        person,
        publishDate: new Date().toISOString(),
        tags: tags.map((tag) => tag.text),
        videoURL,
        approved: false, // Set the flag for approval check
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(firestore, 'videos'), videoData);

      alert('Video uploaded successfully');
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    }
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
              Upload Video
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField label="Title" required value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <input
              accept="video/*"
              type="file"
              required
              onChange={handleFileChange}
            />
            <TextField label="Person" required value={person}
              onChange={(e) => setPerson(e.target.value)} />
            <TextField label="Description" required multiline minRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <div className="tag-input-container">
              <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                placeholder="Add tags"
                inputFieldPosition="top"
                classNames={{
                  tags: 'ReactTags__tags',
                  tagInput: 'ReactTags__tagInput',
                  tagInputField: 'ReactTags__tagInputField',
                  selected: 'ReactTags__selected',
                  tag: 'ReactTags__tag',
                  remove: 'ReactTags__remove',
                  suggestions: 'ReactTags__suggestions',
                  activeSuggestion: 'ReactTags__activeSuggestion',
                }}
              />
            </div>


            <Button variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}>
                Upload
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UploadPage;

