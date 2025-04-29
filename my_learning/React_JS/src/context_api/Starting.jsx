// import React from "react";
// import ParentComponent from "./ParentComponent.jsx";
// import { CounterProvider } from "./CounterContext.jsx";

// const Starting = () => {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium">Context API Example</h3>
//         <ParentComponent />
//     </div>
//   );
// };
import React from "react";
import ParentComponent from "./ParentComponent.jsx";
import { CounterProvider } from "./CounterContext.jsx";

const Starting = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Context API Example</h3>
      <CounterProvider>
        <ParentComponent />
      </CounterProvider>
    </div>
  );
};

export default Starting;
