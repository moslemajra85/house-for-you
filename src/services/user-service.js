import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const registerUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name,
    });

    delete userData.password;
    userData.timestamp = serverTimestamp();

    await setDoc(doc(db, collection(db, 'users'), user.uid), userData);
  } catch (error) {
    console.log(error);
  }
};
