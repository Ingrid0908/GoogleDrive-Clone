import React, { useEffect, useState} from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import FileItem from './FileItem';

import '../../styles/FilesView.css'

const RecentsView = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
      const q = query(collection(db, 'myfiles'), orderBy('timestamp', 'desc'));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFiles(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })));
      });
  
      return () => unsubscribe();
    }, []);

  return (
    <div className='fileView-container'>
        <p style={{fontSize: '25px', color: 'rgb(85, 78, 78)'}}>Recent</p>
        <br/>
        <div className='fileViewTitles-container'>
            <div className='fileViewTitlesLeft-container'>
                <p>Name</p>
            </div>
            <div className='fileViewTitlesRight-container'>
                <p>LastModified</p>
                <p>Files size</p>
            </div>
        </div>
        {
            files.map(item => (
                <FileItem id={item.id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} key={item.id}/>
            ))

        }
    </div>
  )
}

export default RecentsView