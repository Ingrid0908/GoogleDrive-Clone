import React, { useState, useRef, useEffect } from 'react';

import '../../styles/Header.css';

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';

import { auth} from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ userPhoto, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className='header-container'>
      <div className='headerlogo-container'>
        <img src='/images/googledrive.png' alt='driveicon' />
        <span>Drive</span>
      </div>

      <div className='headersearch-container'>
        <div className='headersearchbar-container'>
          <SearchIcon />
          <input type='text' placeholder='Search in Drive' />
          <ExpandMoreIcon />
        </div>
      </div>

      <div className='headericons-container'>
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <AppsIcon />
        <img
          src={userPhoto}
          alt='User'
          onClick={() => setIsModalOpen(!isModalOpen)}
          style={{ cursor: 'pointer' }}
        />

        {isModalOpen && (
          <div className='user-modal' ref={modalRef}>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
