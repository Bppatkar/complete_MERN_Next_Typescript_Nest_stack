import React, { useState } from 'react';

const State = () => {
  const [visible, setVisible] = useState(true);


  return (
    <>
      <div>State change</div>
      {visible ? <h3>true</h3> : <h4>False</h4>}
      <button onClick={() => setVisible(!visible)}>Change</button>
    </>
  );
};

export default State;
