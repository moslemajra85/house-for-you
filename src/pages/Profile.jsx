import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from '../services/user-service';
import { toast } from 'react-toastify';
const Profile = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // ...
      } else {
        setUser(null);
        navigate('/sign-in');
      }
    });
  }, []);

  const notify = () => toast('You are Logged out!');
  
  const handleLogout = () => {
    logout()
      .then(() => {
        notify();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!user) return <h1>Not Logged int</h1>;
  return (
    <div>
      <h1>{user.displayName}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
