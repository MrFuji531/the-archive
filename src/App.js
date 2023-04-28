import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import BookNowPage from './pages/BookNowPage';
import VideoPage from './pages/VideoPage/VideoPage.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import {AuthContext} from './Contexts/AuthContext';
import UploadPage from './pages/UploadPage/UploadPage.jsx';


const App = () => {
  return (
    <Router>
      <AuthContext.Consumer>
        {({user}) => (
          <>
            <Header key={user ? user.uid : 'logged-out'} />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-now" element={<BookNowPage />} />
              <Route path="/video/:videoId" element={<VideoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />}/>
              <Route path="/upload" element={<UploadPage />} />

            </Routes>

            <Footer />
          </>
        )}
      </AuthContext.Consumer>
    </Router>
  );
};

export default App;

