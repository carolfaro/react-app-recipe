import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FoodInProgress() {
  const { verifyFavoriteRecipe, addRecipeToFavoriteList } = useContext(GlobalContext);
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [isChecked, setIsChecked] = useState([false,
    false, false, false, false, false, false, false]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();

  useEffect(() => {
    const { id } = params;

    const requestRecipe = async () => {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(API_URL);
      const data = await result.json();

      setRecipe(data.meals[0]);
    };

    setIsFavorite(verifyFavoriteRecipe(id));
    requestRecipe();
  }, [params, verifyFavoriteRecipe]);

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

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(isChecked));
    }
  }, [isChecked]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIsChecked(inProgressRecipes);
  }, []);

  const handleCheckBox = (index, bool) => {
    setIsChecked((prevList) => {
      const newList = [...prevList];
      newList[index] = bool;

      localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
      return newList;
    });
  };

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
          onClick={ () => {
            const { id } = params;
            navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
            setLinkCopied(true);
          } }
        >
          {linkCopied && <span>Link copied!</span>}
          <img src={ shareIcon } alt="#" />
        </button>
        {isFavorite && (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            onClick={ () => {
              setIsFavorite(!isFavorite);
              addRecipeToFavoriteList(recipe, 'food');
            } }
          >
            <img src={ blackHeartIcon } alt="#" />
          </button>
        )}
        {!isFavorite && (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            onClick={ () => {
              setIsFavorite(!isFavorite);
              addRecipeToFavoriteList(recipe, 'food');
            } }
          >
            <img src={ whiteHeartIcon } alt="#" />
          </button>
        )}
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
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ index }>
              <input
                type="checkbox"
                id={ index }
                checked={ isChecked[index] }
                onChange={ ({ target }) => handleCheckBox(index, target.checked) }
              />
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
