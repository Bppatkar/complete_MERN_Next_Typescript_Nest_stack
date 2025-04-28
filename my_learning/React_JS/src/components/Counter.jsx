import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className=" text-center mt-1.5">
      <h1>{count}</h1>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded gap-0.5"
        onClick={handleIncrement}
      >
        +
      </button>
     
      <button
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        onClick={handleDecrement}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
