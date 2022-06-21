import React, { useContext } from 'react';
import GlobalContext from '../contex/GlobalContext';

function SearchBar() {
  const { ingredients, searchName, searchFirstName } = useContext(GlobalContext);
  console.log(searchFirstName);

  return (
    <main>
      <form>
        {/* <button
          type="submit"
          data-testid="profile-top-btn"
        >
          botão 1

        </button>
        <button
          type="submit"
          data-testid="page-title"
        >
          botão 2

        </button>
        <button
          type="submit"
          data-testid="search-top-btn"
        >
          botão 3

        </button> */}
        {/* <input
          type="text"
          data-testid="search-input"
          name="value"
        />
        <p> só vale a partir daqui_ carol</p> */}
        <label htmlFor="html">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-radio"
            value="carol"
            onChange={ () => ingredients }
          />
          Ingrediente
        </label>
        <label htmlFor="html">

          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-radio"
            onChange={ () => searchName }
          />
          Nome
        </label>
        <label htmlFor="html">

          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-radio"
            onChange={ () => searchFirstName }
          />
          Primeira letra
        </label>
        <button type="submit" data-testid="exec-search-btn">Busca</button>
      </form>
    </main>
  );
}

export default SearchBar;
