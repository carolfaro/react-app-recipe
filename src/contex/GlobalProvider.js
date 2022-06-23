import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [returnAPI, setReturnAPI] = useState({});

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
    }
  };

  const ingredientsMeal = async (ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    const { meals } = await fetch(url).then((response) => response.json());
    if (meals !== null) {
      setReturnAPI(meals);
    }
  };

  const ingredientsDrinks = async (ingrediente) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks !== null) {
      setReturnAPI(drinks);
    }
  };

  const searchDrinksName = async (nome) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks !== null) {
      setReturnAPI(drinks);
    }
  };

  const firstNameLetterDrinks = async (letter) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    const { drinks } = await fetch(url).then((response) => response.json());
    if (drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setReturnAPI([]);
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

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    inputSearchBar,
    setInputSearchBar,
    radioValue,
    setRadioValue,
    buttonSearchBar,
    returnAPI,
    buttonSearchBarDrinks,
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
