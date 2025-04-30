import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../../styles/SidebarItem.css'

const SidebarItem = ({ arrow, icon, label, onClick}) => {
  const [isHovering,setIsHovering] = useState(false);

  return (
    <div 
      className="SidebarItem-wrapper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='SidebarItem-container' 
          onClick={() => label === 'Recent' ? onClick(true) : onClick(false)}
          
      >
          <div className='sidebarItemArrow-container'>
              {arrow && (<ArrowRightIcon/>)}
          </div>

          <div className='SidebarItemMain-container'>
              {icon}
              <p>{label}</p>
          </div>
          
      </div>
      {(isHovering && label !== 'Recent' && label !== 'Home') && (
        <div className="SidebarItem-tooltip">
          Not going to be implemented
        </div>
      )}
    </div>
    
  )
}

export default SidebarItem