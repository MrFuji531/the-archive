import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/book.png';
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth';
import './Header.css';
import {AuthContext} from '../../Contexts/AuthContext';


const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const {user, setUser} = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleToggleNav = () => {
    setNavOpen(!navOpen);
  };

  const navClass = navOpen ? 'nav open' : 'nav';

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  console.log('User:', user);


  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="The Archive" className="logo" />
        </Link>

        <div className="search-container">
          <TextField
            className="search-input"
            placeholder="Search stories"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <nav className={navClass}>
          {user ? (
    <>
      <Link to="/upload"
        className="nav-link upload-link"
        onClick={handleUpload}>
        Upload
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/contact" className="nav-link">
        Contact
      </Link>
      <IconButton className="nav-link user-icon" onClick={handleClick}>
        <PersonIcon style={{color: 'rgba(4, 44, 98, 1)'}} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[
          <MenuItem onClick={handleClose} key="preferences">
            Preferences
          </MenuItem>,
          <MenuItem onClick={handleLogout} key="logout">
            Logout
          </MenuItem>,
        ]}
      </Menu>
    </>
  ) : (
    <>
      <Link to="/login" className="nav-link upload-link">
        Login
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/contact" className="nav-link">
        Contact
      </Link>
    </>
  )}
        </nav>
        {!isDesktop && (
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleNav}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>
    </header>
  );
};

export default Header;
