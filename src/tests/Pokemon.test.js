import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
  });
  test('O tipo correto do Pokémon deve ser mostrado na tela;', () => {
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
  });
  test('O peso médio do Pokémon deve ser mostrado na tela;', () => {
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/Average weight: 6.0 kg/i);
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.', () => {
    expect(screen.getByRole('img', {
      name: /pikachu sprite/i,
    })).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    expect(screen.getByRole('link', {
      name: /more details/i,
    })).toHaveAttribute('href', '/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    userEvent.click(screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    }));
    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
describe('Teste de rota', () => {
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(history.location.pathname).toBe('/pokemon/25');
  });
});
