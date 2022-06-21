import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FoodDetails() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const id = Object.values(params)[0];

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

    ingredients.forEach((item) => {
      if (item[0].includes('strIngredient') && item[1].length > 0) {
        newIngredientsList.push(item[1]);
      }
    });

    setIngredientList(newIngredientsList);
  }, [recipe]);

  return (
    <main>
      <img src="#" data-testid="recipe-photo" alt="#" />
      <div>
        <h1 data-testid="recipe-title">Food Title</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="#" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="#" />
        </button>
        <br />
        <span data-testid="recipe-category">Categoria</span>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </ul>
        <div>
          <h2>Instructions</h2>
          {recipe[0] !== undefined && (
            <span data-testid="instructions">
              Instructions
            </span>)}
        </div>
        <div>
          <h2>Video</h2>
          {recipe[0] !== undefined && (
            <iframe
              data-testid="video"
              src="#"
              title="video"
            />
          )}
        </div>
        <div>
          <h2>Recommended</h2>
          {}
        </div>
        <div>
          <button type="button" data-testid="start-recipe-btn">
            Start Recipe
          </button>
        </div>
      </div>
    </main>
  );
}
