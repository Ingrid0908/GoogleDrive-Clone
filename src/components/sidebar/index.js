import React from 'react';
import '../../styles/Sidebar.css';
import NewFile from './NewFile';
import SidebarItem from './SidebarItem';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const index = () => {
  return (
    <div className='sideBar-container'>
        <NewFile/>
        <div className='sideBarItems-container'>
            <SidebarItem arrow icon={(<InsertDriveFileIcon />)} label={'My Drive'}/>
            <SidebarItem arrow icon={(<DevicesIcon />)} label={'Computers'}/>
            <br/>
            <SidebarItem icon={(<PeopleAltOutlinedIcon />)} label={'Shared with me'}/>
            <SidebarItem icon={(<QueryBuilderIcon />)} label={'Recent'}/>
            <SidebarItem icon={(<StarBorderIcon />)} label={'Starred'}/>
            <br/>
            <SidebarItem icon={(<DeleteOutlineIcon />)} label={'Trash'}/>
            

            <SidebarItem icon={(<CloudQueueIcon />)} label={'Storage'}/>
        </div>
    </div>
  )
}

export default index