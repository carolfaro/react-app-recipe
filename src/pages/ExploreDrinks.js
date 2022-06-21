import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Generic.css';

function ExploreDrinks() {
  const history = useHistory();

  const surpresa = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(url).then((response) => response.json());
    const randomDrink = data.drinks[0].idDrink;
    history.push(`/drinks/${randomDrink}`);
  };

  return (
    <div className="generic">
      <Header title="Explore Drinks" showBt={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default ExploreDrinks;
