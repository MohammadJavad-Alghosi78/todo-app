// node_modules
import { ReactNode, useState } from "react";
// context
import { TodoAppContext } from "../../context";
// types
import { ITodo } from "../../types/ContextType";

interface TodoProviderPropsType {
  children: ReactNode;
}

export const TodoProvider = (props: TodoProviderPropsType) => {
  const { children } = props;
  // Atomic states
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const handleAddTodo = (newTodo: ITodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = (id: string | number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoAppContext.Provider
      value={{
        value,
        onChange: (newValue) => setValue(newValue),
        todos,
        onAddTodo: (todo) => handleAddTodo(todo),
        onDeleteTodo: (id) => handleDeleteTodo(id)
      }}
    >
      {children}
    </TodoAppContext.Provider>
  );
};
