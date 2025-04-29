import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice.jsx";

const MyComponent = () => {
  const [amount, setAmount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-amber-300">
        Redux Toolkit Counter
      </h2>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
          aria-label="Decrement value"
        >
          -
        </button>

        <span className="text-2xl font-mono bg-gray-700 px-6 py-2 rounded-lg min-w-[80px] text-center">
          {count}
        </span>

        <button
          onClick={() => dispatch(increment())}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
          aria-label="Increment value"
        >
          +
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <input
          className="text-center px-4 py-2 rounded-md bg-transparent font-bold text-red-600 focus:outline-none"
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
        />
        <button
          onClick={() => {
            dispatch(incrementByAmount(amount));
            setAmount(0);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Add {amount}
        </button>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          This counter is powered by Redux Toolkit
        </p>
      </div>
    </div>
  );
};

export default MyComponent;
