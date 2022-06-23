import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  // const [test, setTest] = useState([]);
  const [oneDrink, setOneDrink] = useState(false);
  const [oneMeal, setOneMeal] = useState(false);
  const [allDrinks, setAllDrinks] = useState(false);
  const [allMeals, setAllMeals] = useState(false);
  // const [nothing, setNothing] = useState(false);
  const LIMIT = 12;

  const {
    setRadioValue,
    buttonSearchBar,
    buttonSearchBarDrinks,
    returnAPI,
  } = useContext(GlobalContext);

  const location = useLocation();

  const getApi = () => {
    if (location.pathname === '/foods') {
      buttonSearchBar();
    }
    if (location.pathname === '/drinks') {
      buttonSearchBarDrinks();
    }
    return returnAPI;
  };

  useEffect(() => {
    if (returnAPI !== null && returnAPI.length === 1 && location.pathname === '/foods') {
      setOneMeal(true);
    }
    if (returnAPI !== null && returnAPI.length > 1 && location.pathname === '/foods') {
      setAllMeals(true);
    }
    if (returnAPI !== null && returnAPI.length === 1 && location.pathname === '/drinks') {
      setOneDrink(true);
    }
    if (returnAPI !== null && returnAPI.length > 1 && location.pathname === '/drinks') {
      setAllDrinks(true);
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
        {oneDrink === true && (
          <Redirect to={ `/drinks/${returnAPI[0].idDrink}` } />
        )}
        {oneMeal === true && (
          <Redirect to={ `/foods/${returnAPI[0].idMeal}` } />
        )}
      </form>
      {allMeals === true && (
        <div>
          {returnAPI.slice(0, LIMIT).map(((meal, index) => (
            <div
              key={ index.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          )))}
        </div>
      )}
      {allDrinks === true && (
        <div>
          {returnAPI.slice(0, LIMIT).map(((drink, index) => (
            <div
              key={ index.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          )))}
        </div>
      )}
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
