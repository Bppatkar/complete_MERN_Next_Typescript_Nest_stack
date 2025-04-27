import React, { useMemo, useState } from "react";

const UsingMemo = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalc(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "new todo"]);
  };

  return (
    <div className="bg-black text-white">
      <div className="p-6 bg-black text-white rounded-lg shadow-lg max-w-md mx-auto ">
        <h1 className="text-2xl font-bold text-center mb-6">Using Memo Hook</h1>
        <h4>Open console log</h4>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Todos:</h2>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div key={index} className="text-gray-300 mb-2">
                {todo}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No todos added yet.</p>
          )}
          <button
            onClick={addTodo}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
          >
            Add Todo
          </button>
        </div>

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
        <hr className="my-6 border-gray-600" />
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Performing Expensive Calculation
          </h2>
          <p className="text-lg text-center text-green-400">{calculation}</p>
        </div>
      </div>
    </div>
  );
};

// very expensive calculation
const expensiveCalc = (num) => {
  console.log("Performing Expensive Calculation....");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

// everytime i click on add todo then that expensive calculation is performed , and it should not be performed becuase add todo is not connected by count variable so for that we use useMemo hook

export default UsingMemo;
