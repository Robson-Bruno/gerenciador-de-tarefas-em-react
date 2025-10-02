import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TaskPage from "./TaskPage.jsx";

/**
 * Função auxiliar para renderizar componentes que dependem do react-router.
 * @param {React.ReactElement} ui - O componente a ser renderizado.
 * @param {{route?: string, path?: string}} options - Opções de rota.
 */
const renderWithRouter = (ui, { route = "/", path = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("TaskPage", () => {
  it("deve exibir o título obtido dos parâmetros de busca", () => {
    const testTitle = "Minha Tarefa de Teste";
    renderWithRouter(<TaskPage />, {
      route: `/task?title=${encodeURIComponent(testTitle)}`,
      path: "/task",
    });

    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});
