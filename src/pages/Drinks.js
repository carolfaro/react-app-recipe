import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Generic.css';

function Drinks() {
  const [renderDrinksState, setRenderDrinksState] = useState([]);
  const [categorysState, getCategorysState] = useState([]);
  const [selectedCat, setSelecterdCat] = useState('');
  const CINCO = 5;
  const DOZE = 12;

  useEffect(() => {
    const renderDrinks = async () => {
      const urlRM = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const dataRM = await fetch(urlRM).then((response) => response.json());
      const drinksRM = dataRM.drinks.slice(0, DOZE);
      setRenderDrinksState(drinksRM);
    };

    const getCategorys = async () => {
      const urlGC = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const dataGC = await fetch(urlGC).then((response) => response.json());
      const drinksGC = dataGC.drinks.slice(0, CINCO);
      getCategorysState(drinksGC);
    };

    getCategorys();
    renderDrinks();
  }, []);

  const handleFilterBnt = async (category) => {
    if (category !== 'all' && category !== selectedCat) {
      const urlRM2 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const dataRM2 = await fetch(urlRM2).then((response) => response.json());
      const drinksRM2 = dataRM2.drinks.slice(0, DOZE);
      setRenderDrinksState(drinksRM2);
      setSelecterdCat(category);
    } else {
      const urlRM = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const dataRM = await fetch(urlRM).then((response) => response.json());
      const drinksRM = dataRM.drinks.slice(0, DOZE);
      setRenderDrinksState(drinksRM);
      setSelecterdCat('');
    }
  };

  return (
    <div className="drinks-all">
      <Header title="Drinks" />
      <div className="done-rec-btns">
        <button
          type="button"
          onClick={ () => handleFilterBnt('all') }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categorysState.map((cat) => (
          <button
            key={ cat.strCategory }
            type="button"
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ () => handleFilterBnt(cat.strCategory) }
          >
            { cat.strCategory }
          </button>
        ))}
      </div>

      { renderDrinksState.map((ele, index) => (
        <div className="done-rec-cards" key={ ele.strDrink }>
          <a
            href={ `/drinks/${ele.idDrink}` }
            className="drinks-card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="done-rec-img"
              src={ ele.strDrinkThumb }
              alt={ ele.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ele.strDrink}</p>

          </a>
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default Drinks;
