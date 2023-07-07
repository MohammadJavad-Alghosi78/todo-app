// node_modules
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// components
import { TodoProvider } from ".";
import { TodoPage } from "../../components/pages";

const CustomTest = () => {
  return <TodoPage />;
};

describe("Context", () => {
  test("Render initial values", () => {
    render(
      <TodoProvider>
        <CustomTest />
      </TodoProvider>
    );
    const TextFieldEl = screen.getByRole("textbox") as HTMLInputElement;
    const ButtonEl = screen.getByRole("button", {
      name: /add todo/i,
    });
    expect(TextFieldEl).toBeInTheDocument();
    expect(TextFieldEl.value).toBe("");
    expect(ButtonEl).toBeInTheDocument();
    expect(ButtonEl).toBeDisabled();
  });

  test("Button should be active after type in textfield", async () => {
    userEvent.setup();
    render(
      <TodoProvider>
        <CustomTest />
      </TodoProvider>
    );
    const TextFieldEl = screen.getByRole("textbox") as HTMLInputElement;
    const ButtonEl = screen.getByRole("button", {
      name: /add todo/i,
    });
    await userEvent.type(TextFieldEl, "Learning React");
    expect(TextFieldEl.value).toBe("Learning React");
    expect(ButtonEl).not.toBeDisabled();
  });

  describe("After Adding new todo", () => {
    test("New todo should be rendered", async () => {
      render(
        <TodoProvider>
          <CustomTest />
        </TodoProvider>
      );
      const TextFieldEl = screen.getByRole("textbox") as HTMLInputElement;
      const ButtonEl = screen.getByRole("button", {
        name: /add todo/i,
      });
      await userEvent.type(TextFieldEl, "Learning React");
      expect(TextFieldEl.value).toBe("Learning React");
      await userEvent.click(ButtonEl);
      await waitFor(() => {
        const newAddedTodo = screen.getByText(/learning react/i);
        expect(newAddedTodo).toBeInTheDocument();
      });
    });

    test("2 new Todos should be rendere", async () => {
      render(
        <TodoProvider>
          <CustomTest />
        </TodoProvider>
      );
      const TextFieldEl = screen.getByRole("textbox") as HTMLInputElement;
      const ButtonEl = screen.getByRole("button", {
        name: /add todo/i,
      });
      await userEvent.type(TextFieldEl, "Learning React");
      expect(TextFieldEl.value).toBe("Learning React");
      await userEvent.click(ButtonEl);
      await waitFor(() => {
        const newAddedTodo = screen.getByText(/learning react/i);
        expect(newAddedTodo).toBeInTheDocument();
      });

      await userEvent.type(TextFieldEl, "Learning JS");
      expect(TextFieldEl.value).toBe("Learning JS");
      await userEvent.click(ButtonEl);
      await waitFor(() => {
        const newAddedTodo = screen.getByText(/learning js/i);
        expect(newAddedTodo).toBeInTheDocument();
      });

      const todos = screen.getAllByRole("listitem");
      expect(todos.length).toBe(2);
    });
  });
});
