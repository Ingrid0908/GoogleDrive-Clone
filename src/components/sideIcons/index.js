import React, {useState} from 'react';
import '../../styles/SideIcons.css';
import AddIcon from '@mui/icons-material/Add';
import Icon from './Icon';

const Index = () => {

  const [isHovering,setIsHovering] = useState(false);

  return (
      <div className='sideIcons'>
          <div className="sideIcons__top">
            <Icon srcPath={"https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-calendar-512.png"} alt={"Google Calendar"}/>
            <Icon srcPath={'/images/googlekeep.png'} alt={"Google Keep"}/>
            <Icon srcPath={"https://www.androidpolice.com/wp-content/uploads/2018/03/nexus2cee_new-tasks-icon.png"} alt={"Google tasks"}/>
          </div>

          <br/>
          <br/>

          <div className="sideIcons__plusIcon"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
              <AddIcon />
              <div className="SidebarIcons-wrapper">
                { isHovering && (
                  <div className="SidebarIcons-tooltip">
                      Not going to be implemented
                  </div>)
                }
              </div>
              
          </div>
      </div>
  )
}

export default Index