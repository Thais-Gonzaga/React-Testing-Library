import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const paragraph = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });

    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem', () => {
    render(<NotFound />);
    const img = screen.getByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', src);
  });
});
