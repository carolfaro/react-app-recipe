import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [atoa, setAtoa] = useState('');

  const contextValue = {
    atoa,
    setAtoa,
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
