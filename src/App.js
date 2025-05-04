import { useState } from 'react';
import './App.css';
import FilesView from './components/filesView/FilesView';
import Header from './components/header/index';
import SideBar from './components/sidebar/index';
import SideIcons from './components/sideIcons';
import RecentsView from './components/filesView/RecentsView';
import SuggestedView from './components/filesView/SuggestedView';

import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState({
    displayName: "Dummy",
    email: "dummy@email.com",
    emailVerified: true,
    phoneNumber: null,
    photoURL: "/images/profile.png"
  });

  const [activeView, setActiveView] = useState('home'); // 'home', 'drive', 'recents'
  const [pathStack, setPathStack] = useState([]); // for folder navigation

  const handleLogin = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      signOut(auth)
        .then(() => setUser(null))
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="App">
      {(user && user.displayName !== "Dummy") ? (
        <>
          <Header userPhoto={user.photoURL} setUser={setUser} setPathStack={setPathStack} setAView={setActiveView}/>
          <div className="app__main">
            <SideBar setActiveView={setActiveView} pathStack={pathStack} setPathStack={setPathStack} />
            <div className='app_contentArea'>
              {activeView === 'home' && <FilesView />}
              {activeView === 'drive' && <SuggestedView pathStack={pathStack} setPathStack={setPathStack} />}
              {activeView === 'recents' && <RecentsView />}
            </div>
            <SideIcons />
          </div>
        </>
      ) : (
        <div className='app__login'>
          <img src='/images/googledrive.png' alt="Google Drive" />
          <button onClick={handleLogin}>Log in to Google Drive</button>
        </div>
      )}
    </div>
  );
}

export default App;