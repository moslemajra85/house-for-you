import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate('/sign-in');
      }
    });
  }, []);

  return {
    isLoading,
  };
};

export default useCheckStatus;
