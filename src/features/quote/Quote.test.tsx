import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../../test-utils"
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API_URL } from "../../app/constants";
import Cita from "./Cita";

const mockedData = [
  {
    quote: "I used to be with it. But then they changed what it was. Now what I'm with isn't it, and what's it seems scary and wierd. It'll happen to you.",
    character: "Abe Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FAbrahamSimpson.png?1497567511593",
    characterDirection: "Right"
  }, {
    quote: "I don't want to sound like a killjoy, but becuase this is not to my taste I don't think anyone else should be allowed to enjoy it.",
    character: "Marge Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205",
    characterDirection: "Right"
  }, {
    quote: "You're turning me into a criminal when all I want to be is a petty thug.",
    character: "Bart Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
    characterDirection: "Right"
  }

]

const randomQuote = mockedData[1];
function buscarPorTexto(texto: string) {
  const resultado = mockedData.filter(objeto => objeto.character.toLowerCase().includes(texto.toLowerCase()));
  return resultado;
}

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character');

    if (character === null) {
      return res(ctx.json([randomQuote]), ctx.delay(150));
    }
    if (character) {
      const resultado = buscarPorTexto(character);
      return res(ctx.json(resultado));
    }

    return res(ctx.json([]), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());



describe("Pagina Citas", () => {
  describe("Cuando renderizamos el componente", () => {
    it("No deberia mostrar ninguna cita", async () => {
      render(<Cita />);
      expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
    });
  });

  describe("Cuando clickeo en el botón de aleatorio", () => {
    it("Debería mostrar una cita aleatoria (en este ejemplo traera siempre el primer elemento del mockup)", async () => {
      render(<Cita />);

      const quoteElement = screen.getByTestId("citaPersonaje");

      await waitFor(() => {
        expect(quoteElement.textContent).toBe("No se encontro ninguna cita");
      });

      const randomButton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
      await userEvent.click(randomButton);

      await waitFor(() => {
        expect(
          screen.getByText(/I don't want to sound like a killjoy, but becuase this is not to my taste I don't think anyone else should be allowed to enjoy it./i)
        ).toBeInTheDocument();
      });
  });
});

  describe("Cuando ingreso un autor valido", () => {
    it("debería mostrar la cita correspondiente al autor ingresado", async () => {

      render(<Cita />);

      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      const qouteButton = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.keyboard("bart");
      await userEvent.click(qouteButton);
      const quoteElement = screen.getByTestId("citaPersonaje");

      await waitFor(() => {
        expect(quoteElement.textContent).toBe("You're turning me into a criminal when all I want to be is a petty thug.");
      });
    });
  });
  describe("Cuando ingreso un autor invalido", () => {
    it("debería mostrar un mensaje que ingrese un nombre valido", async () => {

      render(<Cita />);

      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      const qouteButton = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.keyboard("qwerty");
      await userEvent.click(qouteButton);
      const quoteElement = screen.getByTestId("citaPersonaje");

      await waitFor(() => {
        expect(quoteElement.textContent).toBe("Por favor ingrese un nombre válido");
      });
    });
  });
  describe("Cuando ingreso un caracter numerico", () => {
    it("debería mostrar un mensaje que ingrese un nombre valido", async () => {

      render(<Cita />);

      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      const qouteButton = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.type(input, "12");
      await userEvent.click(qouteButton);
      const quoteElement = screen.getByTestId("citaPersonaje");

      await waitFor(() => {
        expect(quoteElement.textContent).toBe("Por favor ingrese un nombre válido");
      });
    });
  });

  describe("Cuando se clickea borrar", () => {
    it("debería llamar a la funcion limpiar y restablecer el valor de entrada", async () => {

      render(<Cita />);

      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      await userEvent.click(input);
      await userEvent.keyboard("Marge");

      const botonBorrar = screen.getByLabelText(/Borrar/i);
      await userEvent.click(botonBorrar);

      await expect((input as HTMLInputElement).value).toBe("");
    });
  });

});