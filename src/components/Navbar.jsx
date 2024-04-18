import { useNavigate, useLocation } from 'react-router-dom';
import LocalOfferIcon from '../assets/svg/LocalOfferIcon';
import ExploreIcon from '../assets/svg/ExploreIcon';
import PersonOutlineIcon from '../assets/svg/PersonOutlineIcon';
import locations from '../utils/Locations';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => handleIconClick(locations.getLocation('home'))}
          >
            <ExploreIcon color={locations.currentLocationColor('home')} />
            <p>Explore</p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => handleIconClick('/offers')}
          >
            <LocalOfferIcon color={locations.currentLocationColor('offers')} />
            <p>Offer</p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => handleIconClick('/profile')}
          >
            <PersonOutlineIcon
              color={locations.currentLocationColor('profile')}
            />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
