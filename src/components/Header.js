import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showBt }) {
  const [able, setAble] = useState(false);

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
        <h1 data-testid="page-title">{title}</h1>

        {showBt && (
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
        )}

      </div>
      {able && (
        <div>
          <input
            type="text"
            placeholder="Search Recipe"
            data-testid="search-input"
          />
        </div>)}
    </header>
  );
}

Header.defaultProps = {
  showBt: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showBt: PropTypes.bool,
};

export default Header;
