// node_modules
import { Dispatch, SetStateAction } from "react";

export interface ITodo {
  id: string | number;
  title: string;
}

export interface TodoAppContext {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  todos: Array<ITodo>;
  onAddTodo: (todo: ITodo) => void;
  onDeleteTodo: (id: string | number) => void;
}
