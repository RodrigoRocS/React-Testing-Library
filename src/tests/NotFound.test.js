import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
    renderWithRouter(<NotFound />);
    screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
