import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import useTodos from "./hooks/useTodos";

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
      padding: "5px",
    }}
  >
    {title ?? children}
  </button>
);

function UnorderedList<T>({
  items,
  render,
  children,
  itemClick,
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > & {
    items: T[];
    render: (item: T) => ReactNode;
    itemClick?: (item: T) => void;
  }
>) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx} onClick={() => itemClick?.(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

//////////////////////////////////////

function App() {
  const newTodoRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, removeTodo } = useTodos([
    {
      id: 0,
      text: "Hey there",
      done: false,
    },
  ]);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current && newTodoRef.current.value !== "") {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  const onRemoveTodo = useCallback(
    (id: number) => {
      removeTodo(id);
    },
    [removeTodo]
  );

  return (
    <div className="App">
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UnorderedList
        itemClick={(item) => console.log(item.id)}
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <Button type="button" onClick={() => onRemoveTodo(todo.id)}>
              Remove Todo
            </Button>
          </>
        )}
      />
      <div>
        <input
          style={{
            padding: "5px",
          }}
          type="text"
          ref={newTodoRef}
        />
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
