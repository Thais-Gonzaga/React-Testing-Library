import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const names = ['Home', 'About', 'Favorite Pokémons'];
const urls = ['/', '/about', '/favorites'];

describe('teste o componente <App.js />', () => {
  it('Teste se a pagina contém os links de navegação "Home", "About" e "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const allLink = screen.getAllByRole('link');

    names.forEach((name, index) => {
      expect(allLink[index]).toHaveAccessibleName(name);
    });
  });

  it('Teste se a aplicação é redirecionada para URL correta clicando no link', () => {
    const { history } = renderWithRouter(<App />);
    const allLink = screen.getAllByRole('link');

    names.forEach((name, index) => {
      expect(allLink[index]).toHaveAccessibleName(name);
      userEvent.click(allLink[index]);

      urls.forEach((url, i) => {
        if (index === i) {
          const { location: { pathname } } = history;
          expect(pathname).toBe(url);
        }
      });
    });
  });

  it('Teste se a aplicação é redirecionada para a página "Not Found" ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/trybe'));

    const not = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(not).toBeInTheDocument();
  });
});
