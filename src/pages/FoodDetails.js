import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import GlobalContext from '../contex/GlobalContext';

export default function FoodDetails() {
  const history = useHistory();
  const params = useParams();
  const id = Object.values(params)[0];
  const { verifyFavoriteRecipe } = useContext(GlobalContext);
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [inProgressObject, setInProgressObject] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const MAX_DRINKS_ITEMS = 6;

  const addRecipeToInProgressList = () => {
    const inProgressRecipeList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newObj = {
      cocktails: { ...inProgressRecipeList.cocktails },
      meals: { ...inProgressRecipeList.meals, [id]: [] },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    history.push(`/foods/${id}/in-progress`);
  };

  useEffect(() => {
    const inProgressRecipesList = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (inProgressRecipesList.meals === undefined) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {}, meals: {} }));
    } else {
      setInProgressObject(inProgressRecipesList);
    }

    setIsRecipeFavorite((verifyFavoriteRecipe(id)));
  }, [verifyFavoriteRecipe, id]);

  useEffect(() => {
    const { meals } = inProgressObject;

    if (meals !== undefined) {
      if (meals[id] !== undefined) {
        setShowContinueBtn(true);
      }
    } else {
      setShowContinueBtn(false);
    }
  }, [inProgressObject, id]);

  useEffect(() => {
    const requestRecipe = async () => {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(API_URL);
      const data = await result.json();

      setRecipe(data.meals[0]);
    };

    const handleDoneRecipes = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      if (doneRecipes.length > 0) {
        if (doneRecipes[0].id === id) {
          setShowStartBtn(false);
        }
      } else {
        setShowStartBtn(true);
      }
    };

    handleDoneRecipes();
    requestRecipe();
  }, [params, id]);

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
    const drinkRequest = async () => {
      const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const result = await fetch(API_URL);
      const data = await result.json();

      setDrinkList(data);
    };

    drinkRequest();
  }, []);

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setLinkCopied(!linkCopied);
  };

  return (
    <main>
      <img src={ recipe.strMealThumb } data-testid="recipe-photo" alt="#" />
      <div>
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleLinkCopy }
        >
          {linkCopied && <span>Link copied!</span>}
          <img src={ shareIcon } alt="#" />
        </button>
        {isRecipeFavorite && (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="#" />
          </button>
        )}
        {!isRecipeFavorite && (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
          >
            <img src={ whiteHeartIcon } alt="#" />
          </button>
        )}
        <br />
        <span data-testid="recipe-category">{`Category: ${recipe.strCategory}`}</span>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measureList[index]}`}
            </li>
          ))}
        </ul>
        <div>
          <h2>Instructions</h2>
          <span data-testid="instructions">
            {recipe.strInstructions}
          </span>
        </div>
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            src={ `${recipe.strYoutube}&output=embed` }
            title="video"
          />
        </div>
        <div className="recommendation-container">
          <h2>Recommended</h2>
          {drinkList.length !== 0 && (
            <div className="recommendation-wrapper">
              {drinkList.drinks.slice(0, MAX_DRINKS_ITEMS).map((drink, index) => (
                <div
                  key={ index }
                  className="recommendation"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt="drink"
                    className="recommendation-img"
                  />
                  <span>{ drink.strAlcoholic }</span>
                  <span data-testid={ `${index}-recomendation-title` }>
                    { drink.strDrink }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {(showStartBtn && !showContinueBtn) && (
            <button
              type="button"
              onClick={ addRecipeToInProgressList }
              data-testid="start-recipe-btn"
              className="bottom"
            >
              Start Recipe
            </button>
          )}
          {showContinueBtn && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="bottom"
            >
              Continue Recipe
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
