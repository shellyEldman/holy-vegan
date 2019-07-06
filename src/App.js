import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import BottomNav from './components/navbar/bottomNav';
import Shop from './components/shop/shop';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/profile/profile';
import Recipes from './components/recipes/recipes';

function App() {
    return (
        <div className="App bg-light">
            <Navbar/>
                <Switch>
                    <Route exact path="/" component={Recipes}/>
                    <Route path="/recipes" component={Recipes}/>
                    <Route path="/shop" component={Shop}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route render={() => <Redirect to="/"/>}/>
                </Switch>
            <BottomNav/>
        </div>
    );
}

export default App;
