import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const PROFILE_ICON = 'profile-icon';
const SEARCH_ICON = 'search-icon';

describe('2.0 - Testa a pagina de Login', () => {
  it('2.1 - Testa se é renderizado o componente Header corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const profileIcon1 = screen.getByAltText(PROFILE_ICON);
    const title1 = screen.getByText('Foods');
    const searchIcon1 = screen.getByAltText(SEARCH_ICON);

    expect(profileIcon1).toBeDefined();
    expect(title1).toBeDefined();
    expect(searchIcon1).toBeDefined();
  });

  it('2.2 - Testa se o botão de perfil redireciona para a pagina correta', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const profileIcon = screen.getByAltText(PROFILE_ICON);

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });

  it('2.3 - Testa se o botão de pesquisa renderiza a barra de busca', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByAltText(SEARCH_ICON);

    userEvent.click(searchIcon);

    const searchBtn = screen.getByText('Search');

    expect(searchBtn).toBeDefined();
  });
});
