import React, {useState} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import { withRouter } from "react-router-dom";
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
import firebase from "./config/fbConfig";

const db = firebase.firestore().collection("recipes");

const App = ({match, history}) => {
    const [category, setCategory] = useState('all');
    const [searchField, setSearchField] = useState('');
    const [picked, setPicked] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState('');

    const [itemCategory, setItemCategory] = useState('all');
    const [itemSearchField, setItemSearchField] = useState('');

    const myElement = document.getElementById('scrollDiv');   /* col-lg-10 */

    const handleCategoryClick = (newCategory) => {
        setPicked(false);
        setNotFound(false);
        if (newCategory === category) {
            setEndReached(false);
            setRecipes([]);
            if (myElement) {
                myElement.scrollTo(0, 0);
                window.scrollTo(0, 0);
            }

            let rec = [];

            if (category !== 'all') {
                db.where("categories", "array-contains", category).orderBy('order', 'desc').limit(12).get()
                    .then(querySnapshot => {
                        const myLast = querySnapshot.docs[querySnapshot.docs.length - 1];
                        if (myLast) {
                            setLastVisible(myLast);
                            querySnapshot.forEach((doc) => {
                                rec.push({...doc.data(), id: doc.id});
                            });
                            setRecipes(rec);
                        } else {
                            setEndReached(true);
                        }
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
            } else {
                db.orderBy('order', 'desc').limit(12).get()
                    .then(querySnapshot => {
                        const myLast = querySnapshot.docs[querySnapshot.docs.length - 1];
                        if (myLast) {
                            setLastVisible(myLast);
                            querySnapshot.forEach((doc) => {
                                rec.push({...doc.data(), id: doc.id});
                            });
                            setRecipes(rec);
                        } else {
                            setEndReached(true);
                        }
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
            }
        }
        setSearchField('');
        setCategory(newCategory);
        if (!match.isExact) {
            history.push('/recipes');
        }
    };

    return (
        <div className="App bg-light">
            <Navbar itemCategory={itemCategory} setItemCategory={setItemCategory} itemSearchField={itemSearchField}
                    setItemSearchField={setItemSearchField} category={category} setCategory={setCategory}
                    searchField={searchField} setSearchField={setSearchField}/>
            <div className="mb-5 mb-lg-0">
                <Switch>
                    <Route exact path="/"
                           render={(props) => <Recipes {...props} myElement={myElement} category={category} handleCategoryClick={handleCategoryClick} setCategory={setCategory}
                                                       searchField={searchField} setSearchField={setSearchField} picked={picked} setPicked={setPicked} notFound={notFound} setNotFound={setNotFound} endReached={endReached} setEndReached={setEndReached} recipes={recipes} setRecipes={setRecipes} lastVisible={lastVisible} setLastVisible={setLastVisible}/>}/>
                    <Route path="/recipes"
                           render={(props) => <Recipes {...props} myElement={myElement} category={category} handleCategoryClick={handleCategoryClick} setCategory={setCategory}
                                                       searchField={searchField} setSearchField={setSearchField} picked={picked} setPicked={setPicked} notFound={notFound} setNotFound={setNotFound} endReached={endReached} setEndReached={setEndReached} recipes={recipes} setRecipes={setRecipes} lastVisible={lastVisible} setLastVisible={setLastVisible}/>}/>
                    <Route path="/shop" render={(props) => <Shop {...props} itemCategory={itemCategory}
                                                                 setItemCategory={setItemCategory}
                                                                 itemSearchField={itemSearchField}
                                                                 setItemSearchField={setItemSearchField}/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/cart" component={Cart}/>
                    <Route render={() => <Redirect to="/"/>}/>
                </Switch>
            </div>
            <BottomNav/>
        </div>
    );
};

export default withRouter(App);
