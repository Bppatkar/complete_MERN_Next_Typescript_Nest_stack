import { useReducer } from "react";

const initialState = { count: 0, todos: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, `New Todo ${state.todos.length + 1}`],
      };
    default:
      throw new Error(`Unknown action:  + ${action.type}`);
  }
}

const UsingReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="bg-black text-white">
      <div className="p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Using Reducer Hook
        </h1>

        {/* Todos Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Todos:</h2>
          {state.todos.length > 0 ? (
            state.todos.map((todo, index) => (
              <div key={index} className="text-gray-300 mb-2">
                {todo}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No todos added yet.</p>
          )}
          <button
            onClick={() => dispatch({ type: "add_todo" })}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
          >
            Add Todo
          </button>
        </div>

        <hr className="my-6 border-gray-600" />

        {/* Count Section */}
        <div className="text-center">
          <p className="text-lg mb-4">
            Count: <span className="font-bold">{state.count}</span>
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => dispatch({ type: "increment" })}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Increment
            </button>
            <button
              onClick={() => dispatch({ type: "decrement" })}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsingReducer;
