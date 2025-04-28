import { useState } from 'react';
import './App.css';
import FilesView from './components/filesView/FilesView';
import Header from './components/header/index'
import SideBar from './components/sidebar/index'
import SideIcons from './components/sideIcons/index'


import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from 'firebase/auth';


function App() {
  const [user, setUser] = useState({
    displayName: "Ingrid Fernandez",
    email: "ingrid09@gmail.com",
    emailVerified: true,
    phoneNumber: null,
    photoURL: "/images/profile.png"
  })
  
  const handleLogin = () => {
    if (!user) {
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
      {user ? 
        (
          <>
            <Header userPhoto={user.photoURL} setUser={setUser}/>
            <div className="app__main">
              <SideBar/>
              <FilesView/>
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
