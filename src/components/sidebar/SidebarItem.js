import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../../styles/SidebarItem.css';

const SidebarItem = ({ arrow, icon, label, setActiveView, onArrowClick, state }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    if (label === 'Recent') {
      setActiveView('recents');
    } else if (label === 'My Drive') {
      setActiveView('drive');
    } else {
      setActiveView('home');
    }
  };

  return (
    <div
      className="SidebarItem-wrapper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='SidebarItem-container' onClick={handleClick}>
        <div className='sidebarItemArrow-container' onClick={(e) => { e.stopPropagation(); if (onArrowClick) onArrowClick(); }}>
          {arrow && (state ? <ArrowDropDownIcon /> : <ArrowRightIcon />)}
        </div>

        <div className='SidebarItemMain-container'>
          {icon}
          <p>{label}</p>
        </div>
      </div>
      {(isHovering && !['Recent', 'Home', 'My Drive'].includes(label)) && (
        <div className="SidebarItem-tooltip">
          Not going to be implemented
        </div>
      )}
    </div>
  );
};

export default SidebarItem;