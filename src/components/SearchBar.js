import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  const {
    setRadioValue,
    buttonSearchBar,
    buttonSearchBarDrinks,
  } = useContext(GlobalContext);

  const location = useLocation();

  const verifyApi = () => {
    if (location.pathname === '/foods') {
      buttonSearchBar();
    }
    if (location.pathname === '/drinks') {
      buttonSearchBarDrinks();
    }
  };

  return (
    <main>
      <form>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-radio"
            onChange={ () => setRadioValue('ingredientV') }
          />
          Ingrediente
        </label>

        <label htmlFor="nameS">
          <input
            id="nameS"
            type="radio"
            data-testid="name-search-radio"
            name="search-radio"
            onChange={ () => setRadioValue('nameV') }
          />
          Nome
        </label>

        <label htmlFor="letter">
          <input
            id="letter"
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-radio"
            onChange={ () => setRadioValue('letterV') }
          />
          Primeira letra
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => verifyApi() }
        >
          Search
        </button>
      </form>
    </main>
  );
}

export default SearchBar;
