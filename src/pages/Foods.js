import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalContext from '../contex/GlobalContext';
import './Generic.css';

function Foods() {
  const { setRenderMealsState, renderMealsState } = useContext(GlobalContext);
  const [categorysState, getCategorysState] = useState([]);
  const [selectedCat, setSelecterdCat] = useState('');
  const CINCO = 5;
  const DOZE = 12;

  useEffect(() => {
    const renderMeals = async () => {
      const urlRM = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const dataRM = await fetch(urlRM).then((response) => response.json());
      const mealsRM = dataRM.meals.slice(0, DOZE);
      setRenderMealsState(mealsRM);
    };

    const getCategorys = async () => {
      const urlGC = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const dataGC = await fetch(urlGC).then((response) => response.json());
      const mealsGC = dataGC.meals.slice(0, CINCO);
      getCategorysState(mealsGC);
    };

    getCategorys();
    renderMeals();
  }, []);

  const handleFilterBnt = async (category) => {
    if (category !== 'all' && category !== selectedCat) {
      const urlRM2 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const dataRM2 = await fetch(urlRM2).then((response) => response.json());
      const mealsRM2 = dataRM2.meals.slice(0, DOZE);
      setRenderMealsState(mealsRM2);
      setSelecterdCat(category);
    } else {
      const urlRM = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const dataRM = await fetch(urlRM).then((response) => response.json());
      const mealsRM = dataRM.meals.slice(0, DOZE);
      setRenderMealsState(mealsRM);
      setSelecterdCat('');
    }
  };

  return (
    <div className="foods-all">
      <Header title="Foods" />
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

      { renderMealsState.map((ele, index) => (
        <div className="done-rec-cards" key={ ele.strMeal }>
          <a
            href={ `/foods/${ele.idMeal}` }
            className="foods-card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="done-rec-img"
              src={ ele.strMealThumb }
              alt={ ele.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ele.strMeal}</p>

          </a>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Foods;
