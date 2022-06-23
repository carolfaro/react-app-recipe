import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './ExploreGeneric.css';

function ExploreNatFoods() {
  const [nationalityState, setNationalityState] = useState([]);
  const [mealsState, setMealsState] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const nationsFetch = async () => {
      const urlN = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const dataN = await fetch(urlN).then((response) => response.json());
      setNationalityState(dataN.meals);
    };

    const firstMeals = async () => {
      const DOZE = 12;
      const urlFM = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const dataFM = await fetch(urlFM).then((response) => response.json());
      const meals = dataFM.meals.slice(0, DOZE);
      setMealsState(meals);
    };

    firstMeals();
    nationsFetch();
  }, []);

  const searchAreaMeals = async (nation) => {
    const DOZE = 12;
    if (nation !== 'all') {
      const urlAM1 = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`;
      const dataAM1 = await fetch(urlAM1).then((response) => response.json());
      const meals = dataAM1.meals.slice(0, DOZE);
      setMealsState(meals);
    } else {
      const urlAM2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const dataAM2 = await fetch(urlAM2).then((response) => response.json());
      const meals = dataAM2.meals.slice(0, DOZE);
      setMealsState(meals);
    }
  };

  return (
    <div>
      <Header title="Explore Nationalities" />

      <select
        className="nations-drop-down"
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => {
          searchAreaMeals(target.value);
        } }
      >
        <option
          value="all"
          data-testid="All-option"
        >
          All
        </option>
        { nationalityState.map((nations) => (
          <option
            key={ nations.strArea }
            value={ nations.strArea }
            data-testid={ `${nations.strArea}-option` }
          >
            { nations.strArea }
          </option>
        )) }
      </select>

      <div className="exp-ing-foods">
        { mealsState.map((meal, index) => (
          <a
            href={ `/foods/${meal.idMeal}` }
            className="explore-ing-container"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="img-small"
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMealThumb }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </a>
        )) }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreNatFoods;
