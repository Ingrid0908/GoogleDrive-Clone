import React from 'react'
import '../../styles/FileCard.css'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const FileCard = ({ name, fileUrl}) => {
    return (
        <div className='fileCard'>
            <a href={fileUrl} target="_blank" rel="noreferrer" download>
                <div className="fileCard--top">
                    <InsertDriveFileOutlinedIcon style={{ fontSize: 130 }} />
                </div>

                <div className="fileCard--bottom">
                    <p>{name}</p>
                </div>
            </a>
        </div>
    )
}

export default FileCard