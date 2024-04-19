import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import {
  doc,
  setDoc,
  serverTimestamp,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
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
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    delete userData.password;
    userData.timestamp = serverTimestamp();

    await setDoc(doc(db, 'users', user.uid), userData);
  } catch (error) {
    console.log(error.message);
  }
};

export const signInUser = (userData) => {
  const { email, password } = userData;
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const updateUserProfile = async (userData) => {
  const auth = getAuth();
  await updateProfile(auth.currentUser, userData);

  // update fireStore
  const userRef = doc(db, 'users', auth.currentUser.uid);
  return updateDoc(userRef, userData);
};
