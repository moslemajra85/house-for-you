import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { logout } from '../services/user-service';
import { toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { updateUserProfile } from '../services/user-service';
import { warn, notify } from '../utils/alerts';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);

  

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email } = user;
        setUser({
          name: displayName,
          email,
        });
        // ...
      } else {
        setUser(null);
        navigate('/');
      }
    });
  }, []);

 
  const handleLogout = () => {
    logout()
      .then(() => {
        notify("You are logged out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
 
    try {
      await updateUserProfile({
        displayName: user.name,
      });
      notify("You details has been updated!")
    } catch (error) {
      warn('Could Not Update Profile Details!');
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };
  if (!user)
    return (
      <div className="loader">
        <Puff />
      </div>
    );
  return (
    <div>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && handleSubmit();
                setChangeDetails(!changeDetails);
              }}
            >
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                value={user.name}
                id="name"
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                onChange={handleChange}
              />
              <input
                type="text"
                value={user.email}
                id="email"
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                onChange={handleChange}
              />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
