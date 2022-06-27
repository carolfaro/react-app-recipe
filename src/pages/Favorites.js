import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function Favorites() {
  return (
    <div className="fav-all">
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          id="All"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          id="Food"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          id="Drink"
        >
          Drinks
        </button>
      </div>
      <div>
        <img
          src=""
          alt=""
          data-testid="0-horizontal-image"
        />
        <p data-testid="0-horizontal-name">name</p>
        <p data-testid="0-horizontal-top-text">
          alguma coisa
        </p>

        <button
          type="button"
          data-testid="0-horizontal-share-btn"
          src=""
        >
          botão
        </button>
        <button
          type="button"
          data-testid="0-horizontal-favorite-btn"
          src=""
        >
          <img src={ shareIcon } alt="share-icon" />
          Favorite
        </button>
      </div>
      <div className="done-rec-cards">
        <img
          className="done-rec-img"
          src=""
          alt=""
          data-testid="1-horizontal-image"
        />
        <p data-testid="1-horizontal-name">nome</p>
        <p data-testid="1-horizontal-top-text">
          ALGUMA COISA
        </p>
        <button
          type="button"
          data-testid="1-horizontal-share-btn"
          src=""
        >
          allgo
        </button>
        <button
          type="button"
          data-testid="1-horizontal-favorite-btn"
          src=""
        >
          <img src="" alt="share-icon" />
          Favorite
        </button>
      </div>
    </div>
  );
}

export default Favorites;
