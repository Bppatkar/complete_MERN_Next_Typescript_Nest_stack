import { memo } from "react";

const Todos = ({ addTodo, todos }) => {
  console.log("child render");
  return (
    <>
      <h2>Todo</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        onClick={addTodo}
      >
        Add
      </button>
    </>
  );
};

export default memo(Todos);
