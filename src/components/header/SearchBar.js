import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

import '../../styles/SearchBar.css';

const SearchBar = ({ onSelect, setView }) => {
  const [query2, setQuery2] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const q = query(collection(db, 'myfiles'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllFiles(items);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setQuery2(value);

    if (!value) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const lowerQuery = value.toLowerCase();
    const foldersMap = new Map();
    const matchedFiles = [];

    allFiles.forEach(file => {
      const caption = file.caption || '';
      const path = file.path || caption;

      const pathParts = path.split('/');
      if (pathParts.length > 1) {
        const folderPath = pathParts.slice(0, -1).join('/');
        const folderName = pathParts[pathParts.length - 2];
        if (folderName.toLowerCase().includes(lowerQuery)) {
          if (!foldersMap.has(folderPath)) {
            foldersMap.set(folderPath, {
              id: `folder-${folderPath}`,
              caption: folderName,
              fullPath: folderPath,
              _type: 'folder',
            });
          }
        }
      }

      if (caption.toLowerCase().includes(lowerQuery)) {
        matchedFiles.push({ ...file, _type: 'file' });
      }
    });

    setResults([...foldersMap.values(), ...matchedFiles]);
    setShowDropdown(true);
  };

  const handleSelect = (item) => {
    if (item._type === 'folder') {
      onSelect(item.fullPath.split('/'));
      setView('drive');
    }

    setQuery2('');
    setResults([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='searchbar-wrapper' ref={wrapperRef}>
      <div className='headersearchbar-container'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search in Drive'
          value={query2}
          onChange={handleChange}
          onFocus={() => query2 && setShowDropdown(true)}
        />
        <ExpandMoreIcon />
      </div>

      {showDropdown && results.length > 0 && (
        <div className='search-dropdown'>
          {results.map(item => {
            const content = (
              <>
                {item._type === 'folder' ? <FolderIcon /> : <InsertDriveFileIcon />}
                <div className='search-result-info'>
                  <span className='name'>{item.caption}</span>
                  {item._type === 'file' && item.timestamp && (
                    <span className='date'>
                      {`${item.timestamp?.toDate().getDate()} ${monthNames[item.timestamp?.toDate().getMonth()]} ${item.timestamp?.toDate().getFullYear()}`}
                    </span>
                  )}
                </div>
              </>
            );

            if (item._type === 'file') {
              return (
                <a
                  key={item.id}
                  className='search-result'
                  href={item.fileUrl}
                  target='_blank'
                  rel='noreferrer'
                  download
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className='search-result'
                onClick={() => handleSelect(item)}
              >
                {content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
