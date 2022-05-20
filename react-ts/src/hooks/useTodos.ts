import { useCallback, useReducer } from "react";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | {
      type: "ADD_TODO";
      text: string;
    }
  | {
      type: "REMOVE_TODO";
      id: number;
    };

function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TODO":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE_TODO":
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD_TODO",
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE_TODO",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
}

export default useTodos;
