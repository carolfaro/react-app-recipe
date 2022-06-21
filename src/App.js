import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngsDrinks from './pages/ExploreIngredientsDrinks';
import ExploreIngsFoods from './pages/ExploreIngredientsFoods';
import ExploreNatFoods from './pages/ExploreNationalitiesFoods';
import Favorites from './pages/Favorites';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreIngsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ ExploreIngsDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ ExploreNatFoods } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
