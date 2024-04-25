import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { notify, warn } from '../utils/alerts';
import { Puff } from 'react-loader-spinner';
import { setLogLevel } from 'firebase/firestore/lite';
import ListingItem from '../components/ListingItem';
import { list } from 'firebase/storage';

const Catgeory = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { categoryName } = useParams();

  const getListings = async () => {
    try {
      const listinsgRef = collection(db, 'listings');
      const q = query(
        listinsgRef,
        where('type', '==', categoryName),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const querySnaphsot = await getDocs(q);
      const items = [];
      querySnaphsot.forEach((doc) =>
        items.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      setListings(items);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      warn(err);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === 'rent' ? 'Places For Rent' : 'Places For Sale'}
        </p>
      </header>

      {isLoading ? (
        <Puff />
      ) : listings && listings.length > 0 ? (
        <>
          <main className="categoryListings">
            {listings.map((listing) => {
              return (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              );
            })}
          </main>
        </>
      ) : (
        <p>No Listing for {categoryName}</p>
      )}
    </div>
  );
};

export default Catgeory;
