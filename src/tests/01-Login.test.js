import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const CORRECT_EMAIL = 'main-group-26@trybe.com';
const CORRECT_PASSWORD = '12345678';
const INCORRECT_EMAIL = 'main-group-26@trybe.com.br';
const INCORRECT_PASSWORD = '123456';

describe('1.0 - Testa a pagina de Login', () => {
  it('1.1 - Testa se é renderizada a pagina de Login corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    expect(history.location.pathname).toBe('/');

    const loginBtn = screen.getByRole('button');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    expect(loginBtn).toBeDefined();
    expect(loginBtn).toHaveProperty('disabled', true);
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('1.2 - Testa a verificação de email e senha para ativação do botão', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByRole('button');

    expect(loginBtn).toHaveProperty('disabled', true);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, INCORRECT_EMAIL);
    userEvent.type(passwordInput, INCORRECT_PASSWORD);
    expect(loginBtn).toHaveProperty('disabled', true);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    expect(loginBtn).toHaveProperty('disabled', false);
  });

  it('1.3 - Testa se o email é salvo corretamente no Local Storage', () => {
    const { history } = renderWithRouter(<App />);

    const loginBtn = screen.getByRole('button');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/foods');
    expect(JSON.parse(localStorage.getItem('mealsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('cocktailsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: CORRECT_EMAIL });
  });
});
