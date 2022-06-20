import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../contex/GlobalContext';

function Login() {
  const {
    email,
    setEmail,
    setUser,
    password,
    setPassword,
  } = useContext(GlobalContext);
  const history = useHistory();

  const handleClick = () => {
    setUser({ email, password });
    history.push('/home');
  };

  return (
    <div className="login-all">
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
