import React from "react";
import TaskManager from "./TaskManager";
import store from "./store.jsx";
import { Provider } from "react-redux";

const ReduxLearn = () => {
  return (
    <Provider store={store}>
      <div className="p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-amber-400">
          Redux Task Manager
        </h2>
        <TaskManager />
      </div>
    </Provider>
  );
};

export default ReduxLearn;
