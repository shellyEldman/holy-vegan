import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './recipes.scss';
import RecipesItems from './recipesItems';
import firebase from "../../config/fbConfig";

const db = firebase.firestore().collection("recipes");

const Recipes = ({match, history, category, setCategory, searchField, setSearchField}) => {
    const [searchBy, setSearchBy] = useState('recipe');
    const [searchByName, setSearchByName] = useState('חפש לפי מתכון');
    const [recipeNames, setRecipeNames] = useState([]);
    const [picked, setPicked] = useState(false);
    const [recipesPlusId, setRecipesPlusId] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [lastVisible, setLastVisible] = useState('');
    const [notFound, setNotFound] = useState(false);

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

    const handleRecipePick = (recipePickName) => {
        setPicked(true);
        setRecipes([]);
        setSearchField(recipePickName);
        setEndReached(true);
        let id = '';
        recipesPlusId.forEach(recipe => {
            if (recipe.name === recipePickName) {
                id = recipe.id;
            }
        });

        if (id) {
            let recipe = [];
            db.doc(id).get()
                .then(doc => {
                    recipe.push({...doc.data(), id: doc.id});
                    setRecipes(recipe);
                    setNotFound(false);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        } else {
            setNotFound(true);
            console.log('not found');
        }
        setCategory('all');
    };

    return(
        <div className="recipes row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>הולי ויגן - מתכונים טבעוניים</title>
                <meta name="description" content="מגוון מתכונים טבעוניים וללא גלוטן" />
            </Helmet>


            <div className="col-lg-2 bg-light position-fixed choose-items d-none d-lg-inline border-right shadow-sm m-0 p-0">
                <div className="categories-lg mt-3 text-dark">
                    <div onClick={() => handleCategoryClick('all')} className={`${category === 'all' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>כל המתכונים</div>
                    <div onClick={() => handleCategoryClick('burger')} className={`${category === 'burger' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>המבורגר וקציצות</div>
                    <div onClick={() => handleCategoryClick('salad')} className={`${category === 'salad' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>ירקות וסלטים</div>
                    <div onClick={() => handleCategoryClick('pasta')} className={`${category === 'pasta' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>נודלס ופסטות</div>
                    <div onClick={() => handleCategoryClick('bakery')} className={`${category === 'bakery' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>לחם ומאפים</div>
                    <div onClick={() => handleCategoryClick('soup')} className={`${category === 'soup' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>מרקים</div>
                    <div onClick={() => handleCategoryClick('dessert')} className={`${category === 'dessert' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>קינוחים</div>
                    <div onClick={() => handleCategoryClick('breakfast')} className={`${category === 'breakfast' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>ארוחות בוקר</div>
                    <div onClick={() => handleCategoryClick('dinner')} className={`${category === 'dinner' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>מנות עיקריות</div>
                    <div onClick={() => handleCategoryClick('gluten')} className={`${category === 'gluten' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>ללא גלוטן</div>
                    <div onClick={() => handleCategoryClick('snack')} className={`${category === 'snack' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>חטיפים ונשנושים</div>
                    <div onClick={() => handleCategoryClick('smoothie')} className={`${category === 'smoothie' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>סמוזי ושייקים</div>
                    <div onClick={() => handleCategoryClick('rise')} className={`${category === 'rise' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>תבשילים ואורז</div>
                    <div onClick={() => handleCategoryClick('cheese')} className={`${category === 'cheese' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>גבינות</div>
                </div>
            </div>

            <Route exact path={["/", "/recipes"]} render={() => <div className="col d-lg-none" >
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder={`${searchBy === 'recipe' ? 'הזן את שם המתכון..' : 'הזן את שם המרכיב..'}`}
                           value={searchField} onChange={(e) => {
                                setSearchField(e.target.value);
                                if (picked) {
                                    setPicked(false);
                                }
                           }}
                    />
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-1">{searchByName}</span>
                        </button>
                        <div className="dropdown-menu my-0 py-0" aria-labelledby="dropdownMenuButton">
                            <div onClick={() => {
                                setSearchByName('חפש לפי מתכון');
                                setSearchBy('recipe');
                            }} data-toggle="collapse" data-target="#collapseCategories" className={`py-2 border-bottom dropdown-item`} style={{'cursor': 'pointer'}}>חפש לפי מתכון</div>
                            <div onClick={() => {
                                setSearchByName('חפש לפי מרכיב');
                                setSearchBy('ingredient');
                            }} data-toggle="collapse" data-target="#collapseCategories" className={`py-2 dropdown-item`} style={{'cursor': 'pointer'}}>חפש לפי מרכיב</div>
                        </div>
                    </div>
                </div>
                {(searchBy === 'recipe') && <ul className={`list-group search-list-my-group ${((searchField) && (searchField.replace(/\s/g,"") !== "") && (!picked)) ? '' : 'd-none'}`}>
                    {recipeNames.map((name, i) => {
                        if (!name.includes(searchField)) {
                            return null;
                        } else {
                            return (
                                <li onClick={() => handleRecipePick(name)} key={i}
                                    className="list-group-item py-2">{name}</li>
                            )
                        }
                    })}
                </ul>}
            </div>}/>

            <RecipesItems notFound={notFound} handleCategoryClick={handleCategoryClick} lastVisible={lastVisible} setLastVisible={setLastVisible} myElement={myElement} endReached={endReached} setEndReached={setEndReached} recipes={recipes} setRecipes={setRecipes} setRecipesPlusId={setRecipesPlusId} recipeNames={recipeNames} handleRecipePick={handleRecipePick} setRecipeNames={setRecipeNames} picked={picked} setPicked={setPicked} searchBy={searchBy} setSearchBy={setSearchBy} category={category} setCategory={setCategory} searchField={searchField} setSearchField={setSearchField}/>

        </div>
    );
};

export default Recipes;