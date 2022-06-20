import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const contextValue = {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <GlobalContext.Provider value={ contextValue }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
