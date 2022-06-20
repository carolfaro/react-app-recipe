import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Perfil from './pages/Perfil';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app-all">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Home } />
        <Route path="/drinks" component={ Home } />
        <Route path="/explore" component={ Home } />
        <Route path="/explore/foods" component={ Home } />
        <Route path="/explore/drinks" component={ Home } />
        <Route path="/explore/foods/ingredients" component={ Home } />
        <Route path="/explore/drinks/ingredients" component={ Home } />
        <Route path="/explore/foods/nationalities" component={ Home } />
        <Route path="/done-recipes" component={ Home } />
        <Route path="/favorite-recipes" component={ Favorites } />
        <Route path="/profile" component={ Perfil } />
      </Switch>
    </div>
  );
}

export default App;
