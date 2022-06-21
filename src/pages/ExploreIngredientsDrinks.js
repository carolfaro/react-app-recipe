import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './ExploreGeneric.css';

function ExploreIngsDrinks() {
  const [ingredientesDrinkState, setIngredientesDrinkState] = useState([]);

  useEffect(() => {
    const ingredientsDrinks = async () => {
      const DOZE = 12;
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const data = await fetch(url).then((response) => response.json());
      const ingredientes = data.drinks.slice(0, DOZE);
      setIngredientesDrinkState(ingredientes);
    };
    ingredientsDrinks();
  }, []);



  return (
    <div>
      <Header title="Explore Ingredients Drinks" showBt={ false } />
      <div className="exp-ing-foods">
        {ingredientesDrinkState.map((ing, index) => (
          <div
            className="explore-ing-container"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
              alt={ ing.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ing.strIngredient1}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngsDrinks;
