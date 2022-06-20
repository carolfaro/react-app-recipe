import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app-all">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/home" component={ Home } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/perfil" component={ Perfil } />
      </Switch>
    </div>

  );
}

export default App;
