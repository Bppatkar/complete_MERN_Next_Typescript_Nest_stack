// import React from "react";

// const GrandChildComponent = ({ count, increment, decrement }) => {
//   return (
//     <div className="bg-gray-500 p-3 rounded mt-2">
//       <h6 className="font-medium text-sm mb-2 ">GrandChild Component</h6>
//       <div className="flex gap-2">
//         <button
//           onClick={decrement}
//           className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
//         >
//           Decrement
//         </button>
//         <button
//           onClick={increment}
//           className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
//         >
//           Increment
//         </button>
//       </div>
//       <p className="mt-2 text-xs">Current count from parent: {count}</p>
//     </div>
//   );
// };
import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const GrandChildComponent = () => {
  const { count, increment, decrement } = useContext(CounterContext);
  return (
    <div className="bg-gray-500 p-3 rounded mt-2">
      <h6 className="font-medium text-sm mb-2 ">GrandChild Component</h6>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
        >
          Increment
        </button>
      </div>
      <p className="mt-2 text-xs">Current count from parent: {count}</p>
    </div>
  );
};

export default GrandChildComponent;
