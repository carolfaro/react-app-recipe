import React from 'react';
import { Route, Switch } from 'react-router';
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
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound';
import GlobalProvider from './contex/GlobalProvider';

function App() {
  return (
    <div className="app">
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id" component={ FoodDetails } />
          <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route exact path="/explore/foods/ingredients" component={ ExploreIngsFoods } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreIngsDrinks }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreNatFoods }
          />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </GlobalProvider>
    </div>
  );
}

export default App;
