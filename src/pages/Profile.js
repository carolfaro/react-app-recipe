import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Generic.css';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="generic">
      <Header title="Profile" showBt={ false } />
      <h2 data-testid="profile-email">{ `User: ${email.email}` }</h2>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
