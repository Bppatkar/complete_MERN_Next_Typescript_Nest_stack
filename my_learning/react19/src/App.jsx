import { useContext } from 'react';
import { DataContext } from './context/Context';

function App() {
  const data = useContext(DataContext);
  return (
    <>
      <h1>Hello React 19</h1>
      <h2>Bank Balance :- {data}</h2>
    </>
  );
}

export default App;
