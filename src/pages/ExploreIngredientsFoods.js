import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './ExploreGeneric.css';

function ExploreIngsFoods() {
  const [ingredientesFoodState, setIngredientesFoodState] = useState([]);

  useEffect(() => {
    const ingredientsMeal = async () => {
      const DOZE = 12;
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const data = await fetch(url).then((response) => response.json());
      const ingredientes = data.meals.slice(0, DOZE);
      setIngredientesFoodState(ingredientes);
    };
    ingredientsMeal();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients Foods" showBt={ false } />
      <div className="exp-ing-foods">
        {ingredientesFoodState.map((ing, index) => (
          <div
            className="explore-ing-container"
            key={ ing.idIngredient }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
              alt={ ing.strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>{ ing.strIngredient }</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngsFoods;
