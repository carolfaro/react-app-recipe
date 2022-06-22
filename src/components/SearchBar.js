import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  const [objSearch, setObjtSearch] = useState([]);
  const [locationFood, setLocationFood] = useState('');

  const {
    setRadioValue,
    buttonSearchBar,
    buttonSearchBarDrinks,
    inputSearchBar,
    radioValue,
  } = useContext(GlobalContext);

  const location = useLocation();

  useEffect(() => {
    const verifyLocation = () => {
      if (location.pathname === '/foods') {
        setLocationFood('/foods');
      }
      if (location.pathname === '/drinks') {
        setLocationFood('/drinks');
      }
    };
    verifyLocation();
    return setLocationFood;
  }, []);

  const getApi = () => {
    if (location.pathname === '/foods') {
      buttonSearchBar();
    }
    if (location.pathname === '/drinks') {
      buttonSearchBarDrinks();
    }
  };

  const verifyApi = () => {
    const grupo = {
      inputSearchBar,
      radioValue,
      locationFood,
    };
    setObjtSearch(grupo);
    getApi();
  };

  console.log(objSearch);

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

// RASCUNHO
// redirecione para a página de detalhes
// const { history } = useHistory();

// const id = Object.keys(returnAPI)[0];

// useEffect(() => {
//   if (buttonSearchBar) {
//     setIdFoodOrDrink(returnAPI);
//   }
//   if (buttonSearchBarDrinks) {
//     setIdFoodOrDrink(returnAPI);
//   }
// }, [buttonSearchBar, buttonSearchBarDrinks]);

// useEffect(() => {
//   if (idFoodOrDrink) {
//     setSingleElement(idFoodOrDrink);
//     console.log(singleElement[0]);
//   }
// }, [idFoodOrDrink]);

// useEffect(() => {
//   if (click) {
//     setClick(false);
//     setIdPage(returnAPI.meals[0]);
//     setIdCarol(Object.values(idPage)[0]);
//     console.log(idCarol);
//   }
// }, [click]);
// const handleClick = (id) => {
//   setLocalStorageLogin();
//   history.push(`/foods/${id}`);
// };
