import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const Context = ({ children }) => {
  const [data, setData] = useState(9900000);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default Context;

//! step 1 - use rafce
//! step 2 - wrap main component with that context
//! step 3 - now we recieve data in props/children so here we recieve it here
//! step 4 - now after import create context with any name u want and export it [make sure it has a capital letter ]
//! step 5 - wrap your return with provider and pass  that context which we created using capital letter
//! step 6 - value prop is neccessary to pass data otherwise it will throw an error
