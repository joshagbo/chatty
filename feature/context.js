import React, {createContext, useState} from 'react';

export const CreateErrorContext = createContext();

export const ContextProvider = props => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <CreateErrorContext.Provider
      {...props}
      value={{
        error,
        setError,
        errorMessage,
        setErrorMessage,
      }}
    />
  );
};
