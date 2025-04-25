import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../../styles/SidebarItem.css'

const SidebarItem = ({ arrow, icon, label}) => {
  return (
    <div className='SidebarItem-container'>
        <div className='sidebarItemArrow-container'>
            {arrow && (<ArrowRightIcon/>)}
        </div>

        <div className='SidebarItemMain-container'>
            {icon}
            <p>{label}</p>
        </div>
    </div>
  )
}

export default SidebarItem