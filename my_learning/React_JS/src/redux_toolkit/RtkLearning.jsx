import React from "react";
import store from "./store.jsx";
import MyComponent from "./MyComponent.jsx";
import { Provider } from "react-redux";

const RtkLearning = () => {
  return (
    <Provider store={store}>
      <div className="p-4 bg-gray-800 rounded-lg">
        
        <MyComponent />
      </div>
    </Provider>
  );
};

export default RtkLearning;
