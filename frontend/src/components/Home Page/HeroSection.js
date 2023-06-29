import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export const HeroSection = () => {
  const { state } = useAuthContext();
  const user = state.user;

  return (
    <div className="hero-bg-container">
      <div className="hero-bg">
        <div className="hero-container">
          <div className="text-container">
            <h1>
              Where construction site equipment providers and clients meet.
            </h1>
            <p>
              We provide an efficient and effective rental for construction
              sites.
            </p>
            <div className="hero-btns">
              <Link to={user ? '/equipments' : '/login'} className="ad-btn">
                Advertise Equipment
              </Link>
              <Link to={user ? '/bookings' : '/login'} className="rent-btn">
                Rent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
