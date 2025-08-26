import { useState } from 'react';
import Addtoto from './components/Addtoto';
import TodoList from './components/TodoList';
import type { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    if (!text.trim()) return;
    const id = Math.random().toString();
    setTodos([...todos, { id, text }]);
  };
  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className=" bg-black text-white h-screen w-full">
      <main>
        <Addtoto onAddTodo={addTodoHandler} />
        <TodoList items={todos} onDeleteTodo={deleteTodoHandler} />
      </main>
    </div>
  );
}

export default App;
