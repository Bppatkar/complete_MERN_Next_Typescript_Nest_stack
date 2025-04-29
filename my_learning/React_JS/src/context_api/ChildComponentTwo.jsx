// import React from 'react'

// const ChildComponentTwo = ({ count }) => {
//   return (
//     <div className="bg-gray-600 p-3 rounded">
//       <h5 className="font-medium mb-2">Child Component Two</h5>
//       <p className="text-amber-400">Displaying count: {count}</p>
//     </div>
//   )
// }

import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const ChildComponentTwo = () => {
  const {count} = useContext(CounterContext);
  return (
    <div className="bg-gray-600 p-3 rounded">
      <h5 className="font-medium mb-2">Child Component Two</h5>
      <p className="text-amber-400">Displaying count: {count}</p>
    </div>
  )
}

export default ChildComponentTwo