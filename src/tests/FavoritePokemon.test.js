import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import okemonList from '../data';

describe('Ao favoritar a partir da página de detalhes teste se:', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const pokemonList = [];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    screen.getByText(/No favorite pokémon found/i);
  });
  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const caterpie = [okemonList[2]];
    renderWithRouter(<FavoritePokemon pokemonList={ caterpie } />);
    screen.getByText(/caterpie/i);
  });
});
