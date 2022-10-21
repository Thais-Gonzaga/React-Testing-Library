import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela "No favorite pokemon found", se não tem pokémons favoritos;', () => {
    render(<FavoritePokemons />);
    const paragraph = screen.getByText('No favorite pokemon found');

    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    // No home, clicar em More details
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });

    userEvent.click(details);

    // clicar em label Pokémon favoritado?
    const favoritesLabel = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(favoritesLabel);

    // clicar em Favorite Pokémons
    const favoritesPokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritesPokemon);

    // verificar se tem paragrafo Pikachu
    const paragraphPikachu = screen.getByText('Pikachu');
    expect(paragraphPikachu).toBeInTheDocument();
  });
});
