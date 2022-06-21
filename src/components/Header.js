import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import GlobalContext from '../contex/GlobalContext';

function Header({ title, showBt }) {
  const [able, setAble] = useState(false);
  const { setInputSearchBar } = useContext(GlobalContext);

  return (
    <header className="main-header">
      <div className="header-fixed">
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
            className="btn-search"
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
            onChange={ ({ target }) => setInputSearchBar(target.value) }
          />
          <SearchBar />
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
