import React from 'react';
import '../../styles/SideIcons.css';
import AddIcon from '@mui/icons-material/Add';

const index = () => {
  return (
    <div className='sideIcons'>
        <div className="sideIcons__top">
            <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-calendar-512.png" alt="Google Calendar" />
            <img src='/images/googlekeep.png' alt="Google Keep" />
            <img src="https://www.androidpolice.com/wp-content/uploads/2018/03/nexus2cee_new-tasks-icon.png" alt="Google Tasks" />
        </div>

        <br/>
        <br/>

        <div className="sideIcons__plusIcon">
            <AddIcon />
        </div>
    </div>
  )
}

export default index