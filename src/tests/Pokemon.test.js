import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];
const { name, type, averageWeight, image, id } = pokemon;
const { value, measurementUnit } = averageWeight;
const weigth = `Average weight: ${value} ${measurementUnit}`;
const alt = `${name} sprite`;
const href = `/pokemons/${id}`;
const MoreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const namePokemon = screen.getByText(name);
    const typePokemon = screen.getByText(type);
    const img = screen.getByAltText(alt);
    const weightPokemon = screen.getByText(weigth);

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const details = screen.getByRole('link', { name: MoreDetails });

    expect(details).toHaveAttribute('href', href);
  });

  it('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const details = screen.getByRole('link', { name: MoreDetails });

    userEvent.click(details);

    const { location: { pathname } } = history;
    expect(pathname).toBe(href);
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: MoreDetails });
    userEvent.click(details);

    const { location: { pathname } } = history;
    expect(pathname).toBe(href);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const altIcon = `${name} is marked as favorite`;
    const details = screen.getByRole('link', { name: MoreDetails });
    const img = screen.getByAltText(altIcon);
    const srcIcon = '/star-icon.svg';

    userEvent.click(details);
    expect(img).toHaveAttribute('src', srcIcon);
  });
});
