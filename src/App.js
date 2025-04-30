import { useState } from 'react';
import './App.css';
import FilesView from './components/filesView/FilesView';
import Header from './components/header/index'
import SideBar from './components/sidebar/index'
import SideIcons from './components/sideIcons'
import RecentsView from './components/filesView/RecentsView';


import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from 'firebase/auth';


function App() {
  const [user, setUser] = useState({
    displayName: "Dummy",
    email: "dummy@email.com",
    emailVerified: true,
    phoneNumber: null,
    photoURL: "/images/profile.png"
  })

  const [recent, setRecent] = useState(false);
  
  const handleLogin = () => {
    if (!user ) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
          console.log(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="App">
      {(user && user.displayName !== "Dummy") ? 
        (
          <>
            <Header userPhoto={user.photoURL} setUser={setUser}/>
            <div className="app__main">
              <SideBar setRecent={setRecent}/>
              <div className='app_contentArea'>
                {
                  recent ? <RecentsView/> : <FilesView/>
                }
              </div>
              <SideIcons/>
            </div>
          </>
        ) : (
            <div className='app__login'>
              <img src='/images/googledrive.png' alt="Google Drive" />
              <button onClick={handleLogin}>Log in to Google Drive</button>
            </div>
          )
      }
    </div>
  );
}

export default App;
