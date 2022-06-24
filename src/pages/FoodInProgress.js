import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FoodInProgress() {
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const params = useParams();

  useEffect(() => {
    const { id } = params;

    const requestRecipe = async () => {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(API_URL);
      const data = await result.json();

      setRecipe(data.meals[0]);
    };

    requestRecipe();
  }, [params]);

  useEffect(() => {
    const ingredients = Object.entries(recipe);
    const newIngredientsList = [];
    const newMeasureList = [];

    ingredients.forEach((item) => {
      if (item[0].includes('strIngredient')
        && (typeof item[1]) === 'string' && item[1].length > 0) {
        newIngredientsList.push(item[1]);
      }
    });

    ingredients.forEach((item) => {
      if (item[0].includes('strMeasure')) {
        newMeasureList.push(item[1]);
      }
    });

    setMeasureList(newMeasureList);
    setIngredientList(newIngredientsList);
  }, [recipe]);

  return (
    <div>
      <div>
        <img src={ recipe.strMealThumb } alt="#" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
      </div>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          Botaum
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Botaum
        </button>
      </div>
      <div>
        <h2 data-testid="recipe-category">
          { recipe.strCategory }
        </h2>
      </div>
      <h2>Ingredients</h2>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li
            key={ `${index}-${ingredient}` }
            data-testid="ingredient-step"
          >
            <label htmlFor={ ingredient }>
              <input type="checkbox" id={ ingredient } />
              {`${ingredient} - ${measureList[index]}`}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <p data-testid="instructions">Instructions</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish recipe
        </button>
      </div>
    </div>
  );
}
