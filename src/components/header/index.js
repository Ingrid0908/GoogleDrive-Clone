import React from 'react';
import '../../styles/Header.css'

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';

const index = () => {
  return (
    <div className='header-container'>
        <div className='headerlogo-container'>
            <img src='/images/googledrive.png' alt='driveicon'></img>
            <span>Drive</span>
        </div>
        <div className='headersearch-container'>
            <div className='headersearchbar-container'>
              <SearchIcon/>
              <input type='text' placeholder='Search in Drive'/>
              <ExpandMoreIcon/>
            </div>
        </div>
        <div className='headericons-container'>
          <spam>
            <HelpOutlineIcon/>
            <SettingsIcon/>
          </spam>
          <AppsIcon/>
          <img src='' alt='User'/>
        </div>

    </div>
  )
}

export default index