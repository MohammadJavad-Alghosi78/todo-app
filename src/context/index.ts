// node_modules
import { createContext } from "react";
// types
import { TodoAppContext as TodoAppContextType } from "../types/ContextType";

export const TodoAppContext = createContext<TodoAppContextType>({
  value: "",
  onChange: () => null,
  todos: [],
  onAddTodo: () => null,
  onDeleteTodo: () => null,
});
