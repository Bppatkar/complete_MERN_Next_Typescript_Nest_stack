// import React from "react";
// import GrandChildComponent from "./GrandChildComponent";

// const ChildComponentOne = ({ count, increment, decrement }) => {
//   return (
//     <div className="bg-gray-600 p-3 rounded">
//       <h5 className="font-medium mb-2">Child Component One</h5>
//       <GrandChildComponent
//         count={count}
//         increment={increment}
//         decrement={decrement}
//       />
//     </div>
//   );
// };
import React from "react";
import GrandChildComponent from "./GrandChildComponent";

const ChildComponentOne = () => {
  return (
    <div className="bg-gray-600 p-3 rounded">
      <h5 className="font-medium mb-2">Child Component One</h5>
      <GrandChildComponent />
    </div>
  );
};

export default ChildComponentOne;
