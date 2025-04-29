import { createStore } from "redux";
import tasksReducer from "./taskReducer";

const store = createStore(tasksReducer);
export default store;
