import { useCallback, useState } from "react";
import Todo from "../components/Todo";

const UsingCallback = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  // const addTodo = () => {
  //   setTodos((t) => [...t, "new todo"]);
  // };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "new todo"]);
  }, [todos]);

  return (
    <div className="bg-black text-white">
      <div className="p-6  text-white rounded-lg shadow-lg max-w-md mx-auto mt-1">
        <h1 className="text-2xl font-bold text-center mb-6">
          Using Callback Hook
        </h1>
        <h5>"it will not re render when count change"</h5>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Todos:</h2>
          <Todo todos={todos} addTodo={addTodo} />
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="text-center">
          <p className="text-lg mb-4">
            Count: <span className="font-bold">{count}</span>
          </p>
          <button
            onClick={increment}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};
export default UsingCallback;
