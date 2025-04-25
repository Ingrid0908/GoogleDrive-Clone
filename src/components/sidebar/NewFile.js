import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import '../../styles/NewFile.css';
import { storage, db } from '../../firebase';
import { serverTimestamp, collection, addDoc  } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const Paper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const NewFile = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);

    if (!file) {
        alert('No file selected!');
        return;
    }

    const storageRef = ref(storage, `files/${file.name}`);

    uploadBytes(storageRef, file)
        .then(snapshot => {
            console.log(snapshot);
            return storage.ref('files').child(file.name).getDownloadURL()
                .then(url => ({
                    snapshot,  
                    url
                }));
        })
        .then(({ snapshot, url }) => {
            const myFilesCollection = collection(db, 'myfiles');
            return addDoc(myFilesCollection, {
                timestamp: serverTimestamp(),
                caption: file.name,
                fileUrl: url,
                size: snapshot.bytesTransferred, 
            });
        })
        .then(() => {
            setUploading(false);
            setOpen(false);
            setFile(null);
        })
        .catch(error => {
            console.error("Upload failed:", error);
            setUploading(false);
        });
};


  return (
    <div className='newFile-container'>
      <div className='addNewFile-container' onClick={() => setOpen(true)}>
        <AddIcon />
        <p>New</p>
      </div>
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <Paper>
          <p>Select files you want to upload!</p>
          {
            uploading ? (<p>Uploading...</p>) : 
            (<>
                <input type='file' onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>
            </>)
          }
        </Paper>
      </Modal>
    </div>
  );
};

export default NewFile;
