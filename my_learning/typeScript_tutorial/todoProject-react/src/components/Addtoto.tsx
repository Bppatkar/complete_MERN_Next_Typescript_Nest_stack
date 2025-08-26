import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, type ChangeEvent, type FormEvent } from 'react';

type AddTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const Addtoto: React.FC<AddTodoProps> = ({ onAddTodo }: AddTodoProps) => {
  const [text, setText] = useState<string>('');

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text);
    setText('');
    // console.log(text);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form
        onSubmit={onSubmitHandler}
        className="flex gap-2 items-center p-6 rounded-lg shadow-lg"
      >
        <Input
          onChange={changeEventHandler}
          className="flex-grow text-base"
          type="text"
          value={text}
          placeholder="Enter new TODO..."
        />
        <Button
          type="submit"
          disabled={!text.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Add Todo
        </Button>
      </form>
    </div>
  );
};

export default Addtoto;
