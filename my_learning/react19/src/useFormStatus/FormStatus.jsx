import React from 'react';

const FormStatus = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((res) =>
      setTimeout(() => {
        res(true);
      }, 2000)
    );
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" />
        <input type="password" name="pass" placeholder="Enter your password" />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default FormStatus;
