// Footer.js
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import './Footer.css';

const useStyles = makeStyles((theme) => ({
  footerLinks: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className="footer">
      <div className="left-side">
        <p>&copy; {new Date().getFullYear()} The Archive</p>
        <div className="footer-links">
          <Link to="/privacy-policy" className={classes.footerLinks}>
              Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className={classes.footerLinks}>
              Terms &amp; Conditions
          </Link>
          <Link to="/media-enquiries" className={classes.footerLinks}>
              Media Enquiries
          </Link>
        </div>
      </div>
      <div className="right-side">
        <a href="https://www.instagram.com" className={classes.footerLinks} target="_blank" rel="noopener noreferrer">
            Instagram
        </a>
        <a href="https://www.youtube.com" className={classes.footerLinks} target="_blank" rel="noopener noreferrer">
            YouTube
        </a>
      </div>
    </footer>
  );
};

export default Footer;

