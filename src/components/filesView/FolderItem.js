import React from 'react'
import '../../styles/FileItem.css'

import FolderIcon from '@mui/icons-material/Folder';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FolderItem = ({ folder, onClick}) => {
    const fileDate = `${folder.latestTimestamp?.toDate().getDate()} ${monthNames[folder.latestTimestamp?.toDate().getMonth() + 1]} ${folder.latestTimestamp?.toDate().getFullYear()}`


    return (
        <div className='fileItem' onClick={() => onClick(folder)}>
            <a target="_blank" rel="noreferrer" download>
                <div className="fileItem--left">
                    <FolderIcon />
                    <p>{folder.name}</p>
                </div>
                <div className="fileItem--right">
                    <p>{fileDate}</p>
                    <p>  ______  </p>
                </div>
            </a>
        </div>
    )
}

export default FolderItem