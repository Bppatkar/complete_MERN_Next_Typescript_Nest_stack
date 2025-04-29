import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, editTask, toggleTask } from "./actions.jsx";

const TaskManager = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(editTask(editingId, editText));
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter new task"
        />
        <button
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-700 p-3 rounded flex items-center justify-between"
          >
            {editingId === task.id ? (
              <div className="flex gap-2 w-full">
                <input
                  className="flex-1 bg-gray-600 text-white px-2 py-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                    className="h-5 w-5"
                  />
                  <span
                    className={`${task.completed ? "line-through text-gray-400" : "text-white"}`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => dispatch(removeTask(task.id))}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;