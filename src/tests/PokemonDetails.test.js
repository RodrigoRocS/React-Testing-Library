import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
  });
  test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;', () => {
    screen.getByRole('heading', {
      name: /pikachu details/i,
    });
  });
  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado;', () => {
    expect(screen.queryByRole('link', {
      name: /more details/i,
    })).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    screen.getByRole('heading', {
      name: /summary/i,
    });
  });
  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    screen.getByText(/this intelligent pokémon roasts hard berries with electricity/i);
  });
});
describe('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
  });
  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido;', () => {
    screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
  });
  test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    const getLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(getLocations).toHaveLength(2);
  });
  test('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;', () => {
    screen.getByText(/kanto viridian forest/i);
    screen.getByText(/kanto power plant/i);
    const getLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(getLocations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(getLocations[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
describe('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
  });
  test('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
  });
  test('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;', () => {
    const favoriteCheck = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheck);
    const starMark = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starMark).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(starMark).not.toBeInTheDocument();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?.', () => {
    screen.getByLabelText(/Pokémon favoritado\?/i);
  });
});
