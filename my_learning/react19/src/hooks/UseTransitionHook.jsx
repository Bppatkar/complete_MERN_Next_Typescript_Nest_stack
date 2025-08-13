import React, { useTransition } from 'react';

const UseTransitionHook = () => {
  const [pending, setTransition] = useTransition();

  const handleButton = () => {
    setTransition(async () => {
      await new Promise((res) => setTimeout(res, 2000));
    });
  };

  return (
    <>
      <h4>useTransition </h4>
      <button disabled={pending} onClick={handleButton}>{pending ? 'Submitting...' : 'Submit'}</button>
    </>
  );
};

export default UseTransitionHook;

