import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [returnAPI, setReturnAPI] = useState({});

  const firstNameLetterMeal = async (letter) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const data = await fetch(url).then((response) => response.json());
    setReturnAPI(data);
  };

  const searchMealName = async (names) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${names}`;
    const data = await fetch(url).then((response) => response.json());
    setReturnAPI(data);
  };

  const ingredientsMeal = async (ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    const data = await fetch(url).then((response) => response.json());
    setReturnAPI(data);
  };

  const buttonSearchBar = () => {
    if (radioValue === 'ingredientV') {
      ingredientsMeal(inputSearchBar);
      console.log('Ingrediente');
    } else if (radioValue === 'nameV') {
      searchMealName(inputSearchBar);
      console.log('Name');
    } else if (radioValue === 'letterV' && inputSearchBar.length === 1) {
      firstNameLetterMeal(inputSearchBar);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const contextValue = {
    inputSearchBar,
    setInputSearchBar,
    radioValue,
    setRadioValue,
    buttonSearchBar,
    returnAPI,
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
