import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const paragraph2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', src);
  });
});
