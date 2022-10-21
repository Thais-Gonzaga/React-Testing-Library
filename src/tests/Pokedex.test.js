import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Pokedex from '../pages/Pokedex';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

// const isPokemonFavoriteById = pokemons.map(({ id }) => id);

const names = pokemons.map(({ name }) => name);
describe('teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    // pokemon: objeto do pokemon no data.js
    // isFavorite: filtro dos ids ou seja um array dos ids
    // renderWithRouter(<Pokedex
    //   pokemons={ pokemons }
    //   isPokemonFavoriteById={ isPokemonFavoriteById }
    // />);
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    // renderWithRouter(<Pokedex
    //   pokemons={ pokemons }
    //   isPokemonFavoriteById={ isPokemonFavoriteById }
    // />);
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    names.forEach((name) => {
      const paragraphName = screen.getByText(name);
      expect(paragraphName).toBeInTheDocument();
      userEvent.click(button);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro:', () => {
    const namesButtons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    renderWithRouter(<App />);
    const dataTestId = screen.getAllByTestId('pokemon-type-button');
    const paragraphName = screen.getByText('Psychic');
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    const buttonAll = screen.getByRole('button', { name: 'All' });

    namesButtons.forEach((name, index) => {
      expect(dataTestId[index]).toHaveAccessibleName(name);
    });

    userEvent.click(dataTestId[3]);
    expect(paragraphName).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(paragraphName).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(buttonAll).not.toBeDisabled();
  });
});
