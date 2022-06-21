import React, { useContext } from 'react';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  const {
    setRadioValue,
    buttonSearchBar,
  } = useContext(GlobalContext);

  return (
    <main>
      <form>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-radio"
            checked
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
          type="submit"
          data-testid="exec-search-btn"
          onClick={ () => buttonSearchBar() }
        >
          Search
        </button>
      </form>
    </main>
  );
}

export default SearchBar;
