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
      <button disabled={pending} onClick={handleButton}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </>
  );
};

export default UseTransitionHook;

// if we want to use useFormStatus hooks then we need a form
// if we want same functionality without form then we can use useTransition hooks

// useTransition is a new feature in React 19