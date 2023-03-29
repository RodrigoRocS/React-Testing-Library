import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
