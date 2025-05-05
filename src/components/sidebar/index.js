import React, { useEffect, useState } from 'react';
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
import FolderIcon from '@mui/icons-material/Folder';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Index = ({ setActiveView, pathStack, setPathStack }) => {
  const [folders, setFolders] = useState([]);
  const [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'myfiles'), (snapshot) => {
      const folderMap = new Map();
      snapshot.docs.forEach(doc => {
        const file = doc.data();
        const pathParts = file.path?.split('/') || [];
        if (pathParts.length > 1) {
          const folderPath = pathParts.slice(0, -1).join('/');
          folderMap.set(folderPath, pathParts[pathParts.length - 2]);
        }
      });
      const folderList = Array.from(folderMap.entries()).map(([fullPath, name], idx) => ({ id: `folder-${idx}`, name, fullPath }));
      setFolders(folderList);
    });

    return () => unsubscribe();
  }, []);

  const toggleShowFolders = () => setShowFolders(prev => !prev);

  return (
    <div className='sideBar-container'>
      <NewFile />
      <div className='sideBarItems-container'>
        <SidebarItem icon={<HomeFilledIcon />} label={'Home'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <SidebarItem
          arrow
          icon={<InsertDriveFileIcon />}
          label={'My Drive'}
          setActiveView={setActiveView}
          onArrowClick={toggleShowFolders}
          state={showFolders}
        />
        {showFolders && (
          <div className="sidebar-folderList">
            {folders.map(folder => (
              <div
                key={folder.id}
                className="SidebarItem-subfolder"
                onClick={() => {
                  setActiveView('drive');
                  setPathStack(folder.fullPath.split('/'));
                }}
              >
                <FolderIcon fontSize="small" />
                <p>{folder.name}</p>
              </div>
            ))}
          </div>
        )}
        <SidebarItem icon={<DevicesIcon />} label={'Computers'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <br />
        <SidebarItem icon={<PeopleAltOutlinedIcon />} label={'Shared with me'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <SidebarItem icon={<QueryBuilderIcon />} label={'Recent'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <SidebarItem icon={<StarBorderIcon />} label={'Starred'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <br />
        <SidebarItem icon={<DeleteOutlineIcon />} label={'Trash'} setActiveView={setActiveView} setPathStack={setPathStack}/>
        <SidebarItem icon={<CloudQueueIcon />} label={'Storage'} setActiveView={setActiveView} setPathStack={setPathStack}/>
      </div>
    </div>
  );
};

export default Index;