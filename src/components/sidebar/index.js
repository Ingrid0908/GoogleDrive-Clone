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
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

const index = ({setRecent}) => {
  return (
    <div className='sideBar-container'>
        <NewFile/>
        <div className='sideBarItems-container'>
            <SidebarItem icon={(<HomeFilledIcon />)} label={'Home'} onClick={setRecent}/>
            <SidebarItem arrow icon={(<InsertDriveFileIcon />)} label={'My Drive'} onClick={setRecent}/>
            <SidebarItem arrow icon={(<DevicesIcon />)} label={'Computers'} onClick={setRecent}/>
            <br/>
            <SidebarItem icon={(<PeopleAltOutlinedIcon />)} label={'Shared with me'} onClick={setRecent}/>
            <SidebarItem icon={(<QueryBuilderIcon />)} label={'Recent'} onClick={setRecent}/>
            <SidebarItem icon={(<StarBorderIcon />)} label={'Starred'} onClick={setRecent}/>
            <br/>
            <SidebarItem icon={(<DeleteOutlineIcon />)} label={'Trash'} onClick={setRecent}/>
            

            <SidebarItem icon={(<CloudQueueIcon />)} label={'Storage'} onClick={setRecent}/>
        </div>
    </div>
  )
}

export default index