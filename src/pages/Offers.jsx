import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Puff } from 'react-loader-spinner';

const Offers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate('/sign-in');
      }
    });
  }, []);

  if (isLoading) return <Puff />;
  return <div>Offers</div>;
};

export default Offers;
