import { createContext, useState } from "react";

const CounterContext = createContext({}); // we can give any default value here , we give empty object
// that Context is provide two things 1. Provider 2. Consumer
// and Consumer is used to access the data provided by Provider and we have to export both

const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => {
    if (count > 0) setCount((c) => c - 1);
  };

  const data = {
    count,
    increment,
    decrement,
  };
  return (
    // whatever the state we want to centralise we can put in value
    <CounterContext.Provider value={data}>{children}</CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };

// now we will wrap our ParentComponent.jsx inside starting.jsx with CounterProvider
