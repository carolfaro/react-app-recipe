import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const CORRECT_EMAIL = 'main-group-26@trybe.com';
const CORRECT_PASSWORD = '12345678';
const PROFILE_ICON = 'profile-icon';
const DONE_RECIPES = 'Done Recipes';
const FAV_RECIPES = 'Favorite Recipes';
const LOGOUT = 'Logout';

describe('4.0 - Testa a pagina de Profile', () => {
  it('4.1 - Testa se renderiza corretamente a pagina Profile sem fazer login', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const email = screen.getByTestId('profile-email');
    const btnDoneRecipes = screen.getByText(DONE_RECIPES);
    const btnFavRecipes = screen.getByText(FAV_RECIPES);
    const btnLogout = screen.getByText(LOGOUT);

    expect(email).toBeDefined();
    expect(email).toHaveTextContent('User: No one is Logged In');
    expect(btnDoneRecipes).toBeDefined();
    expect(btnFavRecipes).toBeDefined();
    expect(btnLogout).toBeDefined();
  });

  it('4.2- Testa se renderiza corretamente a pagina Profile fazendo login', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const loginBtn = screen.getByRole('button');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/foods');

    const profileIcon = screen.getByAltText(PROFILE_ICON);

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');

    const email = screen.getByTestId('profile-email');
    const btnDoneRecipes = screen.getByText(DONE_RECIPES);
    const btnFavRecipes = screen.getByText(FAV_RECIPES);
    const btnLogout = screen.getByText(LOGOUT);

    expect(email).toBeDefined();
    expect(email).toHaveTextContent('User: main-group-26@trybe.com');
    expect(btnDoneRecipes).toBeDefined();
    expect(btnFavRecipes).toBeDefined();
    expect(btnLogout).toBeDefined();
  });

  it('4.3 - Testando funcionalidade do botão Done Recipes', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const btnDoneRecipes = screen.getByText(DONE_RECIPES);

    userEvent.click(btnDoneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('4.4 - Testando funcionalidade do botão Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const btnFavRecipes = screen.getByText(FAV_RECIPES);

    userEvent.click(btnFavRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('4.5 - Testando funcionalidade do botão Logout', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const btnLogout = screen.getByText(LOGOUT);

    userEvent.click(btnLogout);

    expect(history.location.pathname).toBe('/');
    expect(JSON.parse(localStorage.getItem('mealsToken'))).toBe(null);
    expect(JSON.parse(localStorage.getItem('cocktailsToken'))).toBe(null);
    expect(JSON.parse(localStorage.getItem('user'))).toBe(null);
  });
});
