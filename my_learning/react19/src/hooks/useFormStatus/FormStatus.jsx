import React from 'react';
import { useFormStatus } from 'react-dom';

// This must be a separate component (child of the form)
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
  );
};

const FormStatus = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 2000));
      console.log('Form submitted');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Form Submission Status (React 19 - useFormStatus)</h1>
      <h3>
        In React 19 (client-side only), useFormStatus won't automatically track
        pending states for regular onSubmit handlers. It's primarily designed
        for Server Actions (Next.js), so in a plain React app, the button text
        won't update.
      </h3>
      <form onSubmit={handleSubmit} action={() => {}}>
        <input type="text" placeholder="Enter your name" />
        <input type="password" placeholder="Enter your password" />
        <SubmitButton /> {/* Child component using useFormStatus */}
      </form>
    </>
  );
};

export default FormStatus;
