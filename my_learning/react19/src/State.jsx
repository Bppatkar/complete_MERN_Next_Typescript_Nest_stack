import React, { useState } from 'react';

const State = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      <div>State change</div>
      <h1>{visible.toString()}</h1>
      <button onClick={() => setVisible(!visible)}>Change</button>
    </>
  );
};

export default State;

