import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('3.0 - Testa o componente Footer', () => {
  it('3.1 - Testa se os botões sao renderizados e com imagens', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    expect(history.location.pathname).toBe('/foods');

    const drinkBtn = screen.getByAltText('drink-icon');
    const exploreBtn = screen.getByAltText('explore-icon');
    const foodsBtn = screen.getByAltText('fork-spon-icon');

    expect(drinkBtn).toBeDefined();
    expect(exploreBtn).toBeDefined();
    expect(foodsBtn).toBeDefined();
  });

  it('3.2 - Testa se os botões redirecionam corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    expect(history.location.pathname).toBe('/foods');

    const drinkBtn = screen.getByAltText('drink-icon');

    userEvent.click(drinkBtn);

    expect(history.location.pathname).toBe('/drinks');

    const exploreBtn = screen.getByAltText('explore-icon');

    userEvent.click(exploreBtn);

    expect(history.location.pathname).toBe('/explore');

    const foodsBtn = screen.getByAltText('fork-spon-icon');

    userEvent.click(foodsBtn);

    expect(history.location.pathname).toBe('/foods');
  });
});
