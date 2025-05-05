import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import FileItem from './FileItem';
import FolderItem from './FolderItem';
import '../../styles/FilesView.css';

const SuggestedView = ({ pathStack, setPathStack }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'myfiles'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docus = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const folderMap = new Map();

      docus.forEach(file => {
        const pathParts = file.path?.split('/');
        if (pathParts && pathParts.length > 1) {
          const folderPath = pathParts.slice(0, -1).join('/');
          const folderName = pathParts[pathParts.length - 2];
          const existing = folderMap.get(folderPath);

          if (!existing || (file.timestamp?.seconds > existing.latestTimestamp?.seconds)) {
            folderMap.set(folderPath, {
              name: folderName,
              fullPath: folderPath,
              latestTimestamp: file.timestamp,
            });
          }
        }
      });

      const folders = Array.from(folderMap.entries()).map(([path, data], index) => ({
        id: `folder-${index}`,
        ...data,
      }));

      setFolders(folders);
      setFiles(docus);
    });

    return () => unsubscribe();
  }, []);

  const currentFolderPath = pathStack.join('/');
  const displayedFiles = pathStack.length
    ? files.filter(file => file.path?.startsWith(currentFolderPath + '/'))
    : files.filter(file => !file.path?.includes('/'));

  const displayedFolders = pathStack.length
    ? folders.filter(folder => folder.fullPath.startsWith(currentFolderPath + '/') &&
        folder.fullPath.split('/').length === pathStack.length + 1)
    : folders.filter(folder => folder.fullPath.split('/').length === 1);

  const handleFolderClick = (folder) => {
    const segments = folder.fullPath.split('/');
    setPathStack(segments);
  };

  const handleBreadcrumbClick = (index) => {
    setPathStack(pathStack.slice(0, index + 1));
  };

  return (
    <div className='fileView-container'>
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <span
          onClick={() => setPathStack([])}
          style={{ cursor: 'pointer'}}
        >
          My Drive
        </span>
        {pathStack.map((segment, index) => (
          <span key={index}>
            <span> &nbsp;›&nbsp; </span>
            <span
              onClick={() => handleBreadcrumbClick(index)}
              style={{ cursor: 'pointer'}}
            >
              {segment}
            </span>
          </span>
        ))}
      </div>

      {/* File List Headers */}
      <div className='fileViewTitles-container'>
        <div className='fileViewTitlesLeft-container'>
          <p>Name</p>
        </div>
        <div className='fileViewTitlesRight-container'>
          <p>Last Modified</p>
          <p>File Size</p>
        </div>
      </div>

      {/* Folder List */}
      <div className='folderList'>
          {displayedFolders.map(folder => (
            <FolderItem
              folder={folder}
              onClick={() => handleFolderClick(folder)}
              key={folder.id}
            />
          ))}
      </div>

      {/* File List Items */}
      {displayedFiles.map(item => (
        <FileItem
          id={item.id}
          caption={item.caption}
          timestamp={item.timestamp}
          fileUrl={item.fileUrl}
          size={item.size}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default SuggestedView;