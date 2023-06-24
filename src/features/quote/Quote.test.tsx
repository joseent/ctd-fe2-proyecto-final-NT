import { rest } from "msw";
import App from "../../App";
import { setupServer } from "msw/node";
import {render} from "../../test-utils"
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import {store} from "../../app/store";
import { API_URL } from "../../app/constants";

const data = {
  results: [
    {
        quote: "I don't want to sound like a killjoy, but becuase this is not to my taste I don't think anyone else should be allowed to enjoy it.",
        character: "Marge Simpson",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205",
        characterDirection: "Right"
    },
  ],
};

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(data), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("App", () => {
        describe("Cuando renderizamos el componente", () => {
        test("No deberia mostrar ningun cita", async () => {
            render(
            <Provider store={store}>
                <App />
            </Provider>
            );
    
            expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
        });
        });
    describe("Cuando renderizamos el componentea", () => {
        test("Debería mostrar una cita al hacer clic en el botón de aleatorio", async () => {
          render(
            <Provider store={store}>
              <App />
            </Provider>
          );
          const quoteElement = screen.getByTestId("citaPersonaje");
          expect(quoteElement.textContent).toBe("No se encontro ninguna cita");
    
          const randomButton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
    
          userEvent.click(randomButton);
    
          await waitFor(() => {
            expect(quoteElement.textContent).not.toBe("No se encontro ninguna cita");
          });
        });
      });
});