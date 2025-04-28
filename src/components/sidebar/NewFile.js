import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import '../../styles/NewFile.css';
import { storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { Menu, MenuItem, Button } from '@mui/material';

const NewFile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (file) => {
    if (!file) {
      alert('No file selected!');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `files/${file.name}`);

    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => {
        const myFilesCollection = collection(db, 'myfiles');
        return addDoc(myFilesCollection, {
          timestamp: serverTimestamp(),
          caption: file.name,
          fileUrl: url,
          size: file.size,
        });
      })
      .then(() => {
        setUploading(false);
        handleClose();
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        setUploading(false);
      });
  };
  const handleFolderUpload = (e) => {
    const files = e.target.files;
    if (!files.length) return;
  
    setUploading(true);
  
    const uploadPromises = Array.from(files).map((file) => {
      const storageRef = ref(storage, `folders/${file.webkitRelativePath}`);
      return uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
        .then((url) => {
          const myFilesCollection = collection(db, 'myfiles');
          return addDoc(myFilesCollection, {
            timestamp: serverTimestamp(),
            caption: file.name,
            fileUrl: url,
            size: file.size,
            path: file.webkitRelativePath,
          });
        });
    });
  
    Promise.all(uploadPromises)
      .then(() => {
        setUploading(false);
        handleClose();
      })
      .catch((error) => {
        console.error('Folder upload failed:', error);
        setUploading(false);
      });
  };
  

  return (
    <div className='newFile-container'>
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        style={{
          backgroundColor: 'white',
          color: 'rgb(82,82,82)',
          textTransform: 'none',
          borderRadius: '24px',
          fontWeight: 500,
        }}
        onClick={handleClick}
      >
        New
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: 8,
            minWidth: 220,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem>
        {
          uploading ? (
          <div style={{width: '100%', textAlign: 'center'}}>
            <span className='loader'></span> Uploading...
          </div>)
          :
          (
            <label style={{ width: '100%', cursor: 'pointer' }}>
              File upload
              <input 
                type='file' 
                style={{ display: 'none' }} 
                onChange={handleChange}
              />
            </label>)
        }
        
        </MenuItem>
        <MenuItem >
          <label style={{ width: '100%', cursor: 'pointer' }}>
            Folder upload
            <input 
              type='file' 
              webkitdirectory= 'true'
              directory= ''
              style={{ display: 'none' }} 
              onChange={handleFolderUpload}
            />
          </label>
        </MenuItem>
        <MenuItem disabled>Google Docs</MenuItem>
        <MenuItem disabled>Google Sheets</MenuItem>
        <MenuItem disabled>Google Slides</MenuItem>
        <MenuItem disabled>Google Forms</MenuItem>
        <MenuItem disabled>More</MenuItem>

      </Menu>
    </div>
  );
};

export default NewFile;
