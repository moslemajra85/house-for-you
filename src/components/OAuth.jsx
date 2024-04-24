import { useLocation, useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import googleIcon from '../assets/svg/googleIcon.svg';
import { warn, notify } from '../utils/alerts';
const OAuth = () => {
  const nagigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      //check if user already exist in the firestore
      // if user doesn't exist create user

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      nagigate('/');
      notify('Authorized Successfully with Google');
    } catch (error) {
      warn('Could Not Authorize with');
    }
  };

  return (
    <div className="socialLoggin">
      <p>Sign {location.pathname === '/sign-up' ? 'Up' : 'In'} with</p>
      <button className="socialIconDiv">
        <img
          className="socialIconImg"
          src={googleIcon}
          alt="google icon"
          onClick={onGoogleClick}
        />
      </button>
    </div>
  );
};

export default OAuth;
