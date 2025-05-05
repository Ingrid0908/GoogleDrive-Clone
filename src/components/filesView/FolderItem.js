import React from 'react'
import '../../styles/FolderItem.css'

import FolderIcon from '@mui/icons-material/Folder';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FolderItem = ({ folder, onClick}) => {
    const fileDate = `${folder.latestTimestamp?.toDate().getDate()} ${monthNames[folder.latestTimestamp?.toDate().getMonth() + 1]} ${folder.latestTimestamp?.toDate().getFullYear()}`


    return (
        <div className='folderItem' onClick={() => onClick(folder)}>
                <div className="folderItem--left">
                    <FolderIcon />
                    <p>{folder.name}</p>
                </div>
                <div className="folderItem--right">
                    <p>{fileDate}</p>
                    <p>  ______  </p>
                </div>
        </div>
    )
}

export default FolderItem