import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('6.0 - Testa a pagina de NotFound', () => {
  it('6.1 - Testa se é renderizado a pagina de Not Found corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foodssda');

    const error = screen.getByText('ERROR 404 Page Not Found');

    expect(error).toBeDefined();
  });
});
