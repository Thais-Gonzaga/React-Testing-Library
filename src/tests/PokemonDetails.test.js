import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];
const { id, name, summary, foundAt } = pokemon;
const href = `/pokemons/${id}`;

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(href);
    });
    const title = `${name} Details`;

    const title1 = screen.getByRole('heading', { name: title, level: 2 });
    expect(title1).toBeInTheDocument();

    // const details = screen.getByRole('link', { name: 'More details' });
    // expect(details).not.toBeInTheDocument();

    const title2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(title2).toBeInTheDocument();

    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(href);
    });
    const title = `Game Locations of ${name}`;
    const title3 = screen.getByRole('heading', { name: title, level: 2 });
    expect(title3).toBeInTheDocument();

    const locationAlt = `${name} location`;

    foundAt.forEach(({ location, map }, index) => {
      const locationTitle = screen.getByText(location);
      expect(locationTitle).toBeInTheDocument();
      const locationImg = screen.getAllByRole('img');
      expect(locationImg[index + 1]).toHaveAttribute('src', map);
      expect(locationImg[index + 1]).toHaveAttribute('alt', locationAlt);
    });
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(href);
    });
    const favoritesLabel = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritesLabel);
    expect(favorite).toBeChecked();
    userEvent.click(favoritesLabel);
    expect(favorite).not.toBeChecked();
  });
});
