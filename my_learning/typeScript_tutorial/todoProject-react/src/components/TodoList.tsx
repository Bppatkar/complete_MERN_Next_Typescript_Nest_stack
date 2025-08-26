import React from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Delete } from 'lucide-react';

type TodoListProp = {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProp> = ({ items, onDeleteTodo }) => {
  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      {items.map((todo) => (
        <Card key={todo.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">{todo.text}</CardTitle>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Delete todo"
              onClick={() => onDeleteTodo(todo.id)}
            >
              <Delete className="text-red-600" size={18} />
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
