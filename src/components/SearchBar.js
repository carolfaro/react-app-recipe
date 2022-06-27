import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  const DOZE = 12;

  const {
    setRadioValue,
    buttonSearchBar,
    buttonSearchBarDrinks,
    returnAPI,
    setRenderMealsState,
    setRenderDrinksState,
  } = useContext(GlobalContext);

  const location = useLocation();
  const history = useHistory();

  const getApi = () => {
    if (location.pathname === '/foods') {
      buttonSearchBar();
    }
    if (location.pathname === '/drinks') {
      buttonSearchBarDrinks();
    }
  };

  useEffect(() => {
    if (returnAPI !== null && returnAPI.length === 1 && location.pathname === '/foods') {
      history.push(`/foods/${returnAPI[0].idMeal}`);
    }
    if (returnAPI !== null && returnAPI.length > 1 && location.pathname === '/foods') {
      setRenderMealsState(returnAPI.slice(0, DOZE));
    }
    if (returnAPI !== null && returnAPI.length === 1 && location.pathname === '/drinks') {
      history.push(`/drinks/${returnAPI[0].idDrink}`);
    }
    if (returnAPI !== null && returnAPI.length > 1 && location.pathname === '/drinks') {
      setRenderDrinksState(returnAPI.slice(0, DOZE));
    }
  }, [returnAPI]);

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
          onClick={ () => getApi() }
        >
          Search
        </button>
      </form>
    </main>
  );
}

export default SearchBar;
