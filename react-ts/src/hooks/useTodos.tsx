import {
  useCallback,
  useReducer,
  createContext,
  useContext,
  FunctionComponent,
  ReactNode,
} from "react";

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

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

function useTodosManager(initialTodos: Todo[]): {
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

export const TodosProvider: FunctionComponent<{
  initialTodos: Todo[];
  children: ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): UseTodosManagerResult["todos"] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
