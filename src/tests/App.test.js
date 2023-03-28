import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', {
      name: /home/i,
    });
  });
  test('O segundo link deve possuir o texto About;', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', {
      name: /about/i,
    });
  });
  test('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
  });
});

describe('Teste se os links redirecionam para a rota correta', () => {
  test('Se redireciona para pagina inicial ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Se redireciona para About ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Se redireciona para favorites ao clicar em Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favorities = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    userEvent.click(favorities);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Se redireciona para pagina Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    screen.getByRole('heading', {
      name: /page requested not found/i,
    });
  });
});
