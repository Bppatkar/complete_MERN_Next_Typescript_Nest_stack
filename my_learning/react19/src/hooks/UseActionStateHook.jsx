import React, { useActionState } from 'react';

const UseActionStateHook = () => {
  const handleSubmit = async (lastData, formData) => {
    let name = formData.get('name');
    let password = formData.get('password');

    await new Promise((res) => setTimeout(res, 2000));
    console.log('Submit', name, password, name && password, lastData);

    if (name && password)
      return { message: 'Data submitted successfully', name, password };
    else return { error: 'Enter both fields', name, password };
  };
const [data, action, pending] = useActionState(handleSubmit,undefined);

  return (
    <>
      <h1>UseActionState Hooks in react 19</h1>

      <form action={action}>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          defaultValue={data?.value}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          defaultValue={data?.password}
        />
        <br /> <br />
        <button disabled={pending}>Submit</button>
        <br />
        {data?.error && <span style={{ color: 'red' }}>{data?.error}</span>}
        {data?.message && (
          <span style={{ color: 'green' }}>{data?.message}</span>
        )}
      </form>
      <h1>Name: {data?.name}</h1>
      <h1>Password: {data?.password}</h1>
    </>
  );
};

export default UseActionStateHook;
