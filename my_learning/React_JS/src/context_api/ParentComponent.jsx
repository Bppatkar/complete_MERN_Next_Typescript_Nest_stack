// import React, { useState } from "react";
// import ChildComponentOne from "./ChildComponentOne.jsx";
// import ChildComponentTwo from "./ChildComponentTwo.jsx";

// const ParentComponent = () => {
//   const [count, setCount] = useState(1);

//   const increment = () => {
//     setCount((c) => c + 1);
//   };

//   const decrement = () => {
//     if (count > 0) setCount((c) => c - 1);
//   };

//   return (
//     <div className="space-y-4 p-4 bg-gray-700 rounded-lg">
//       <h4 className="font-medium">Parent Component</h4>
//       <p className="text-amber-400">Count: {count}</p>

//       <div className="grid grid-cols-2 gap-4">
//         <ChildComponentOne
//           count={count}
//           increment={increment}
//           decrement={decrement}
//         />
//         <ChildComponentTwo count={count} />
//       </div>
//     </div>
//   );
// };

import { useContext } from "react";
import ChildComponentOne from "./ChildComponentOne.jsx";
import ChildComponentTwo from "./ChildComponentTwo.jsx";
import { CounterContext } from "./CounterContext.jsx";

const ParentComponent = () => {
  const { count } = useContext(CounterContext);
  return (
    <div className="space-y-4 p-4 bg-gray-700 rounded-lg">
      <h4 className="font-medium">Parent Component</h4>
      <p className="text-amber-400">Count: {count}</p>

      <div className="grid grid-cols-2 gap-4">
        <ChildComponentOne />
        <ChildComponentTwo />
      </div>
    </div>
  );
};

export default ParentComponent;
