import React, {useState} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import BottomNav from './components/navbar/bottomNav';
import Shop from './components/shop/shop';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/profile/profile';
import Recipes from './components/recipes/recipes';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Cart from './components/cart/cart';

const App = () => {
    const [category, setCategory] = useState('all');
    const [searchField, setSearchField] = useState('');

    const [itemCategory, setItemCategory] = useState('all');
    const [itemSearchField, setItemSearchField] = useState('');

    return (
        <div className="App bg-light">
            <Navbar itemCategory={itemCategory} setItemCategory={setItemCategory} itemSearchField={itemSearchField} setItemSearchField={setItemSearchField} category={category} setCategory={setCategory} searchField={searchField} setSearchField={setSearchField}/>
                <Switch>
                    <Route exact path="/" render={(props) => <Recipes {...props} category={category} setCategory={setCategory} searchField={searchField} setSearchField={setSearchField}/>}/>
                    <Route path="/recipes" render={(props) => <Recipes {...props} category={category} setCategory={setCategory} searchField={searchField} setSearchField={setSearchField}/>}/>
                    <Route path="/shop" render={(props) => <Shop {...props} itemCategory={itemCategory} setItemCategory={setItemCategory} itemSearchField={itemSearchField} setItemSearchField={setItemSearchField}/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/cart" component={Cart}/>
                    <Route render={() => <Redirect to="/"/>}/>
                </Switch>
            <BottomNav/>
        </div>
    );
};

export default App;
