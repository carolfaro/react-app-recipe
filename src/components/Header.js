import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [able, setAble] = useState(false);
  const { pathname } = useLocation();
  const location = pathname[1].toUpperCase() + pathname.slice(2);

  return (
    <header className="main-header">
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{location}</h1>
        <button
          type="button"
          onClick={ () => setAble(!able) }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
          />
        </button>
      </div>
      {able && <input data-testid="search-input" />}
    </header>
  );
}

export default Header;
