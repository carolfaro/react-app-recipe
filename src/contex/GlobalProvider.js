import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [returnAPI, setReturnAPI] = useState({});
  const alert = 'Sorry, we haven\'t found any recipes for these filters.';

  const firstNameLetterMeal = async (letter) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const { meals } = await fetch(url).then((response) => response.json());
    if (meals !== null) {
      setReturnAPI(meals);
    }
  };

  const searchMealName = async (names) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${names}`;
    const { meals } = await fetch(url).then((response) => response.json());
    if (meals !== null) {
      setReturnAPI(meals);
    } else {
      setReturnAPI([]);
      global.alert(alert);
    }
  };

  const ingredientsMeal = async (ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    const { meals } = await fetch(url).then((response) => response.json());
    if (meals !== null) {
      setReturnAPI(meals);
    } else {
      setReturnAPI([]);
      global.alert(alert);
    }
  };

  const ingredientsDrinks = async (ingrediente) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks !== null) {
      setReturnAPI(drinks);
    } else {
      setReturnAPI([]);
      global.alert(alert);
    }
  };

  const searchDrinksName = async (nome) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks !== null) {
      setReturnAPI(drinks);
    } else {
      setReturnAPI([]);
      global.alert(alert);
    }
  };

  const firstNameLetterDrinks = async (letter) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks !== null) {
      setReturnAPI(drinks);
    }
  };

  const buttonSearchBar = () => {
    if (radioValue === 'ingredientV') {
      ingredientsMeal(inputSearchBar);
    } else if (radioValue === 'nameV') {
      searchMealName(inputSearchBar);
    } else if (radioValue === 'letterV' && inputSearchBar.length === 1) {
      firstNameLetterMeal(inputSearchBar);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const buttonSearchBarDrinks = () => {
    if (radioValue === 'ingredientV') {
      ingredientsDrinks(inputSearchBar);
    } else if (radioValue === 'nameV') {
      searchDrinksName(inputSearchBar);
    } else if (radioValue === 'letterV' && inputSearchBar.length === 1) {
      firstNameLetterDrinks(inputSearchBar);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const addRecipeToFavoriteList = (recipe, t) => {
    let newObj = {};

    if (t === 'food') {
      newObj = {
        id: recipe.idMeal,
        type: t,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }

    if (t === 'drink') {
      newObj = {
        id: recipe.idDrink,
        type: t,
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavoriteRecipesList = [...favoriteRecipes, newObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesList));
  };

  const verifyFavoriteRecipe = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favoriteRecipes.length > 0) {
      if (favoriteRecipes[0].id === id) {
        return true;
      }
    } else {
      return false;
    }
  };

  const contextValue = {
    inputSearchBar,
    setInputSearchBar,
    radioValue,
    setRadioValue,
    buttonSearchBar,
    returnAPI,
    buttonSearchBarDrinks,
    addRecipeToFavoriteList,
    verifyFavoriteRecipe,
  };

  return (
    <GlobalContext.Provider value={ contextValue }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
