import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

function DoneRecipes() {
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
  const [all, setAll] = useState([]);
  const [arrayToRender, setArrayToRender] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const padrao = [
      {
        id: '',
        type: '',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
        doneDate: '',
        tags: [],
      },
    ];
    const getLocalSorageInfo = async () => {
      const allLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || padrao;
      const drinksLocalStorage = allLocalStorage.filter((ele) => ele.type === 'drink');
      const foodsLocalStorage = allLocalStorage.filter((ele) => ele.type === 'food');

      setDrinks(drinksLocalStorage);
      setFoods(foodsLocalStorage);
      setArrayToRender(allLocalStorage);
      setAll(allLocalStorage);
    };

    getLocalSorageInfo();
  }, []);

  const handleShareBtn = (id) => {
    console.log(id);
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setLinkCopied(true);
  };

  const handleFilterButtons = (type) => {
    if (type === 'Food') {
      setArrayToRender(foods);
    } else if (type === 'Drink') {
      setArrayToRender(drinks);
    } else if (type === 'All') {
      setArrayToRender(all);
    }
  };

  return (
    <div className="done-rec-all">
      <Header title="Done Recipes" showBt={ false } />
      <div className="done-rec-btns">
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
      </div>

      { arrayToRender.map((recipe, index) => (
        (recipe.type === 'food')
          ? (
            <div className="done-rec-cards" key={ recipe.id }>
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
              <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
              {recipe.tags.map((tag, index2) => (
                <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index2 }>
                  { tag }
                </p>
              ))}
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShareBtn(recipe.id) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
              {linkCopied && <span>Link copied!</span>}
            </div>
          ) : (
            <div className="done-rec-cards" key={ recipe.id }>
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
            </div>
          )
      ))}

    </div>
  );
}

export default DoneRecipes;
