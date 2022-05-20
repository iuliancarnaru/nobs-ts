import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

// children props
const Box = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      color: "white",
      backgroundColor: "orangered",
    }}
  >
    {children}
  </div>
);

interface Box2Props {
  children: ReactNode;
}

// children props 2
const Box2: FunctionComponent<Box2Props> = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      color: "white",
      backgroundColor: "dodgerblue",
    }}
  >
    {children}
  </div>
);

const List: FunctionComponent<{
  items: string[];
  handleClick?: (item: string) => void;
}> = ({ items, handleClick }) => (
  <ul>
    {items.map((item, idx) => (
      <li key={idx} onClick={() => handleClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

//////////////////////////////////

interface Payload {
  text: string;
}

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

//////////////////////////////////////

// Detailed HTML props
// https://unpkg.com/@types/react@18.0.9/index.d.ts

const Button: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> & { title?: string } = ({ title, children, style, ...rest }) => (
  <button
    type="button"
    {...rest}
    style={{
      ...style,
      backgroundColor: "greenyellow",
      // border: "none",
      border: "2px solid greenyellow",
      margin: "5px 7px",
    }}
  >
    {title ?? children}
  </button>
);

//////////////////////////////////////

const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementor: FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button
    type="button"
    onClick={() => setValue(value + 1)}
    title={`Add - ${value}`}
  />
);

//////////////////////////////////////

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);

  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setPayload(data));
  }, []);

  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType): Todo[] => {
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
    },
    []
  );

  const onListItemClick = useCallback((item: string) => {
    console.log(item);
  }, []);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current && newTodoRef.current.value !== "") {
      dispatch({
        type: "ADD_TODO",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  const [value, setValue] = useNumber(0);

  return (
    <div className="App">
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <Incrementor value={value} setValue={setValue} />
      <Box2>How are you?</Box2>
      <List items={["one", "two", "three"]} handleClick={onListItemClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button
            type="button"
            onClick={() =>
              dispatch({
                type: "REMOVE_TODO",
                id: todo.id,
              })
            }
          >
            Remove Todo
          </Button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <Button type="button" onClick={onAddTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  );
}

export default App;

/*

    Using useCallback is helpful in reducing referential integrity issues. 
    It's not always required. If it's just a callback handler within 
    the same component you usually safely avoid it. But if you are passing 
    the function onto another component, or you are creating a custom hook, 
    then you should use useCallback and useMemo.

*/
