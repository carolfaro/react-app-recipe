import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const BY_INGREDIENT = 'By Ingredient';
const BY_NATIONALITY = 'By Nationality';
const SURPRISE_ME = 'Surprise me!';
const EXPLORE_FOODS = 'Explore Foods';
const EXPLORE_DRINKS = 'Explore Drinks';
const EXPLORE_FOODS_URL = '/explore/foods';
const EXPLORE_DRINKS_URL = '/explore/drinks';

describe('5.0 - Testa a pagina de Explore, Exlore Foods e Explores Drinks)', () => {
  it('5.1 - Testa se renderiza corretamente a pagina Explore', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore');

    const btnByFood = screen.getByText(EXPLORE_FOODS);
    const btnByDrink = screen.getByText(EXPLORE_DRINKS);

    expect(btnByFood).toBeDefined();
    expect(btnByDrink).toBeDefined();
  });

  it('5.2 - Testa a funcionalidade dos botões da página Explore', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore');

    const btnByFood = screen.getByText(EXPLORE_FOODS);

    userEvent.click(btnByFood);

    expect(history.location.pathname).toBe(EXPLORE_FOODS_URL);

    history.push('/explore');

    const btnByDrink = screen.getByText(EXPLORE_DRINKS);

    userEvent.click(btnByDrink);

    expect(history.location.pathname).toBe(EXPLORE_DRINKS_URL);
  });

  it('5.3 - Testa se renderiza corretamente a página de Explore Foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push(EXPLORE_FOODS_URL);

    const btnByIng = screen.getByText(BY_INGREDIENT);
    const btnByNat = screen.getByText(BY_NATIONALITY);
    const btnSurprise = screen.getByText(SURPRISE_ME);

    expect(btnByIng).toBeDefined();
    expect(btnByNat).toBeDefined();
    expect(btnSurprise).toBeDefined();
  });

  it('5.4 - Testa se renderiza corretamente a página de Explore Drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push(EXPLORE_DRINKS_URL);

    const btnByIng = screen.getByText(BY_INGREDIENT);
    const btnSurprise = screen.getByText(SURPRISE_ME);

    expect(btnByIng).toBeDefined();
    expect(btnSurprise).toBeDefined();
  });

  it('5.5 - Testa a funcionalidade dos botões da página Explore Foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push(EXPLORE_FOODS_URL);

    const btnByIng = screen.getByText(BY_INGREDIENT);

    userEvent.click(btnByIng);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');

    history.push(EXPLORE_FOODS_URL);

    const btnByNat = screen.getByText(BY_NATIONALITY);

    userEvent.click(btnByNat);

    expect(history.location.pathname).toBe('/explore/foods/nationalities');

    history.push(EXPLORE_FOODS_URL);

    const btnSurprise = screen.getByText(SURPRISE_ME);

    userEvent.click(btnSurprise);

    expect(history.location.pathname).not.toBe('/explore/foods/ingredients');
  });

  it('5.6 - Testa a funcionalidade dos botões da página Explore Drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push(EXPLORE_DRINKS_URL);

    const btnByIng = screen.getByText(BY_INGREDIENT);

    userEvent.click(btnByIng);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');

    history.push(EXPLORE_DRINKS_URL);

    const btnSurprise = screen.getByText(SURPRISE_ME);

    userEvent.click(btnSurprise);

    expect(history.location.pathname).not.toBe('/explore/drinks/ingredients');
  });
});
