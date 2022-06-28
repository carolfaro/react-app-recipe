import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Favorites() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  const [linkCopied, setLinkCopied] = useState(false);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [idFavorite, setIdFavorite] = useState('');
  const [recipesToRender, setRecipesToRender] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);

  const handleShareBtn = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setLinkCopied(true);
  };

  const favoriteBtn = (recipe) => {
    if (recipe !== undefined) {
      setIdFavorite(recipe);
      const filteredRecipes = favoriteRecipes.filter((ele) => ele.id !== recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
      setRecipesToRender(filteredRecipes);
      setFilterRecipes(filteredRecipes);
    }
  };

  const handleFilterButtons = (type) => {
    if (type === 'Food') {
      const filteredFood = filterRecipes.filter((ele) => ele.type === 'food');
      setRecipesToRender(filteredFood);
    }
    if (type === 'Drink') {
      const filteredDrinks = filterRecipes.filter((ele) => ele.type === 'drink');
      setRecipesToRender(filteredDrinks);
    }
    if (type === 'All') {
      setRecipesToRender(filterRecipes);
    }
  };

  useEffect(() => {
    if (isRecipeFavorite) {
      favoriteBtn();
    }
  }, [isRecipeFavorite]);

  useEffect(() => {
    if (favoriteRecipes !== undefined) {
      setRecipesToRender(favoriteRecipes);
      setFilterRecipes(favoriteRecipes);
    }
  }, []);

  console.log(idFavorite);
  console.log(recipesToRender);

  return (
    <div className="fav-all">
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        id="All"
        onClick={ ({ target }) => handleFilterButtons(target.id) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        id="Food"
        onClick={ ({ target }) => handleFilterButtons(target.id) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        id="Drink"
        onClick={ ({ target }) => handleFilterButtons(target.id) }
      >
        Drinks
      </button>
      {recipesToRender.map((recipe, index) => (
        (recipe.type === 'food')
          ? (
            <div className="done-rec-cards" key={ index }>
              <a href={ `/foods/${recipe.id}` }>
                <img
                  className="done-rec-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <a href={ `/foods/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </a>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              <button
                type="button"
                name={ recipe.id }
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShareBtn(recipe.id) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
              {linkCopied && <span>Link copied!</span>}
              <button
                type="button"
                name={ recipe.id }
                data-testid="0-horizontal-favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => {
                  favoriteBtn(recipe.id);
                  setIsRecipeFavorite(!isRecipeFavorite);
                } }
              >
                <img src={ blackHeartIcon } alt="#" />
              </button>
            </div>
          ) : (
            <div className="done-rec-cards" key={ index }>
              <a href={ `/drinks/${recipe.id}` }>
                <img
                  className="done-rec-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <a href={ `/drinks/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </a>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
              <p>{ recipe.category }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShareBtn(recipe.id) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
              {linkCopied && <span>Link copied!</span>}
              <button
                type="button"
                data-testid="1-horizontal-favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => {
                  favoriteBtn(recipe.id);
                  setIsRecipeFavorite(!isRecipeFavorite);
                } }
              >
                <img src={ blackHeartIcon } alt="#" />
              </button>
            </div>
          )
      ))}
    </div>
  );
}

export default Favorites;
