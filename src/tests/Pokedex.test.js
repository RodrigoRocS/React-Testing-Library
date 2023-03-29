import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    const btn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btn).toBeInTheDocument();
    screen.getByText(/Pikachu/i);
    userEvent.click(btn);
    screen.getByText(/Charmander/i);
    userEvent.click(btn);
    screen.getByText(/Caterpie/i);
    userEvent.click(btn);
    screen.getByText(/Ekans/i);
    userEvent.click(btn);
    screen.getByText(/Alakazam/i);
    userEvent.click(btn);
    screen.getByText(/Mew/i);
    userEvent.click(btn);
    screen.getByText(/Rapidash/i);
    userEvent.click(btn);
    screen.getByText(/Snorlax/i);
    userEvent.click(btn);
    screen.getByText(/Dragonair/i);
    userEvent.click(btn);
    screen.getByText(/Pikachu/i);
  });
  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro:', () => {
    screen.getByRole('button', { name: /all/i });
    const btnTypes = screen.getAllByTestId('pokemon-type-button');
    expect(btnTypes).toHaveLength(7);
    btnTypes.forEach((e) => {
      const btn = screen.getAllByRole('button', {
        name: e.innerText,
      });
      userEvent.click(btn[0]);
      expect(screen.getByTestId('pokemon-type').innerText).toBe(e.innerText);
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    const btn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btn).toBeInTheDocument();
    screen.getByText(/Pikachu/i);
    userEvent.click(btn);
    screen.getByText(/Charmander/i);
    userEvent.click(btn);
    screen.getByText(/Caterpie/i);
    userEvent.click(btn);
    screen.getByText(/Ekans/i);
    userEvent.click(btn);
    screen.getByText(/Alakazam/i);
    userEvent.click(btn);
    screen.getByText(/Mew/i);
    userEvent.click(btn);
    screen.getByText(/Rapidash/i);
    userEvent.click(btn);
    screen.getByText(/Snorlax/i);
    userEvent.click(btn);
    screen.getByText(/Dragonair/i);
    userEvent.click(btn);
    screen.getByText(/Pikachu/i);
  });
  test('Testa o filtro por tipo', () => {
    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireBtn);
    const btn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemonList.forEach((e) => {
      if (e.type === fireBtn.innerHTML) {
        expect(screen.getByText(`${e.name}`)).toBeInTheDocument();
        userEvent.click(btn);
      }
    });
    screen.getByRole('button', {
      name: /all/i,
    });
  });
});
