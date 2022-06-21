import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Generic.css';

function ExploreFoods() {
  const history = useHistory();

  const surpresa = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const data = await fetch(url).then((response) => response.json());
    const randomMeal = data.meals[0].idMeal;
    history.push(`/foods/${randomMeal}`);
  };

  return (
    <div className="generic">
      <Header title="Explore Foods" showBt={ false } />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => surpresa() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
