import React, {useState} from 'react'
import '../../styles/SideIcons.css';

const Icon = ( { srcPath, alt }) => {

  const [isHovering,setIsHovering] = useState(false);

  return (
    <div className="SidebarIcons-wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
        <div className="sideIcons__top">
            <img src={srcPath} alt={alt}/>
        </div>
        
        { isHovering && (
            <div className="SidebarIcons-tooltip">
                Not going to be implemented
            </div>
        )}
    </div>
    
  )
}

export default Icon