import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Recipe from './recipe';
import {connect} from "react-redux";
import firebase from "../../config/fbConfig";

const dbNames = firebase.firestore().collection("recipesNames");
const db = firebase.firestore().collection("recipes");
const VisibilitySensor = require('react-visibility-sensor').default;

const RecipesItems = ({notFound, handleCategoryClick, lastVisible, setLastVisible, myElement, endReached, setEndReached, recipes, setRecipes, setRecipesPlusId, recipeNames, setRecipeNames, handleRecipePick, picked, setPicked, category, setCategory, searchField, setSearchField, searchBy, setSearchBy}) => {
    const [categoryName, setCategoryName] = useState('כל המתכונים');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!picked) {
            setEndReached(false);
            setRecipes([]);
            if (myElement) {
                myElement.scrollTo(0, 0);
                window.scrollTo(0, 0);
            }

            let rec = [];
            let namesId = [];
            let names = [];

            if (recipeNames.length === 0) {
                dbNames.doc("names").get()
                    .then(querySnapshot => {
                        namesId = [...querySnapshot.data().names];
                        names = namesId.map(recipe => {
                            return recipe.name;
                        });
                        setRecipeNames([...names]);
                        setRecipesPlusId([...namesId]);
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
            }

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

        switch (category.toString()) {
            case 'all':
                setCategoryName('כל המתכונים');
                break;
            case 'salad':
                setCategoryName('ירקות וסלטים');
                break;
            case 'pasta':
                setCategoryName('נודלס ופסטות');
                break;
            case 'bakery':
                setCategoryName('לחם ומאפים');
                break;
            case 'soup':
                setCategoryName('מרקים');
                break;
            case 'dessert':
                setCategoryName('קינוחים');
                break;
            case 'breakfast':
                setCategoryName('ארוחות בוקר');
                break;
            case 'dinner':
                setCategoryName('מנות עיקריות');
                break;
            case 'gluten':
                setCategoryName('ללא גלוטן');
                break;
            case 'snack':
                setCategoryName('חטיפים ונשנושים');
                break;
            case 'smoothie':
                setCategoryName('סמוזי ושייקים');
                break;
            case 'burger':
                setCategoryName('המבורגר וקציצות');
                break;
            case 'rise':
                setCategoryName('תבשילים ואורז');
                break;
            case 'cheese':
                setCategoryName('גבינות');
                break;
            default:
                setCategoryName('כל המתכונים');
        }
    }, [category, myElement, setRecipeNames, recipeNames.length, setEndReached, setRecipes, setRecipesPlusId, picked, setLastVisible]);

    const onChangeVisibility = (isVisible) => {
        if (isVisible) {
            getMoreRecipes();
        }
    };

    const getMoreRecipes = () => {
        let rec = [...recipes];
        if (category !== 'all') {
            db.where("categories", "array-contains", category).orderBy('order', 'desc').startAfter(lastVisible).limit(12).get()
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
            db.orderBy('order', 'desc').startAfter(lastVisible).limit(12).get()
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
    };

    return (
        <div id="scrollDiv" className="col-lg-10 bg-light items p-0">
            <div className="container">
                <Switch>
                    <Route exact path={["/", "/recipes"]} render={() => <React.Fragment>
                        <h3 onClick={() => setOpen(!open)} className="mt-3 text-center text-dark d-lg-none"
                            style={{'cursor': 'pointer'}} data-toggle="collapse" data-target="#collapseOne">
                            <span>{categoryName}</span><i
                            className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}/></h3>
                        <ul onClick={() => setOpen(!open)} id="collapseOne"
                            className="list-group text-dark collapse mb-3 d-lg-none">
                            <div onClick={() => handleCategoryClick('all')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`pb-1 pt-1 border-bottom list-group-item ${category === 'all' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>כל המתכונים
                            </div>
                            <div onClick={() => handleCategoryClick('burger')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'burger' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>המבורגר וקציצות
                            </div>
                            <div onClick={() => handleCategoryClick('salad')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'salad' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>ירקות וסלטים
                            </div>
                            <div onClick={() => handleCategoryClick('pasta')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'pasta' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>נודלס ופסטות
                            </div>
                            <div onClick={() => handleCategoryClick('bakery')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'bakery' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>לחם ומאפים
                            </div>
                            <div onClick={() => handleCategoryClick('soup')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'soup' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>מרקים
                            </div>
                            <div onClick={() => handleCategoryClick('dessert')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'dessert' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>קינוחים
                            </div>
                            <div onClick={() => handleCategoryClick('breakfast')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'breakfast' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>ארוחות בוקר
                            </div>
                            <div onClick={() => handleCategoryClick('dinner')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'dinner' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>מנות עיקריות
                            </div>
                            <div onClick={() => handleCategoryClick('gluten')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'gluten' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>ללא גלוטן
                            </div>
                            <div onClick={() => handleCategoryClick('snack')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'snack' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>חטיפים ונשנושים
                            </div>
                            <div onClick={() => handleCategoryClick('smoothie')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'smoothie' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>סמוזי ושייקים
                            </div>
                            <div onClick={() => handleCategoryClick('rise')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`py-1 border-bottom list-group-item ${category === 'rise' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>תבשילים ואורז
                            </div>
                            <div onClick={() => handleCategoryClick('cheese')} data-toggle="collapse"
                                 data-target="#collapseOne"
                                 className={`pt-1 pb-1 list-group-item ${category === 'cheese' ? 'text-light bg-success' : ''}`}
                                 style={{'cursor': 'pointer'}}>גבינות
                            </div>
                        </ul>

                        <div className="mb-3 pt-3 bg-light searchBar d-none d-lg-block">
                            <div className="input-group">
                                <input style={{'outline': 'none'}} type="text" className="form-control"
                                       placeholder={`${searchBy === 'recipe' ? 'הזן את שם המתכון..' : 'הזן את שם המרכיב..'}`}
                                       value={searchField} onChange={(e) => {
                                    setSearchField(e.target.value);
                                    if (picked) {
                                        setPicked(false);
                                    }
                                }}
                                />
                                <div className="input-group-append">
                                    <button onClick={() => {
                                        setSearchBy('recipe');
                                        handleRecipePick(searchField);
                                    }}
                                            className={`btn ${searchBy === 'recipe' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                            type="button">חיפוש לפי מתכון
                                    </button>
                                    <button onClick={() => setSearchBy('ingredient')}
                                            className={`btn ${searchBy === 'ingredient' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                            type="button">חיפוש לפי מרכיב
                                    </button>
                                </div>
                            </div>

                            {(searchBy === 'recipe') &&
                            <ul className={`list-group search-list-my-group ${((searchField) && (searchField.replace(/\s/g, "") !== "") && (!picked)) ? '' : 'd-none'}`}>
                                {recipeNames.map((name, i) => {
                                    if (!name.includes(searchField)) {
                                        return null;
                                    } else {
                                        return (
                                            <li id={`li${i}`} onClick={() => {
                                                handleRecipePick(name);
                                            }} key={i}
                                                className="list-group-item py-2">{name}</li>
                                        )
                                    }
                                })}
                            </ul>}
                        </div>

                        <div id="followScroll" className="row items-list mt-3 mt-lg-0">

                            {recipes && recipes.map(recipe => {
                                return (
                                    <div key={recipe.id} className="col-sm-6 col-md-4 col-xl-3">
                                        <Link to={`/recipes/${recipe.id}`} style={{textDecoration: 'none'}}
                                              className="subnav_add">
                                            <div className="card recipe-main-card shadow-sm mb-3 text-dark">
                                                <img src={recipe.imgUrl} className="card-img-top"
                                                     alt={recipe.recipeName}/>
                                                <div className="card-body">
                                                    <p className="card-text text-center font-weight-bolder">{recipe.recipeName}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                            {notFound && <p className="container">מתכון לא נמצא..</p>}
                        </div>


                        {recipes.length > 0 && !endReached && <VisibilitySensor onChange={onChangeVisibility}>
                            <div className="d-flex justify-content-center mb-3 text-dark">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </VisibilitySensor>}

                        {(categoryName !== 'כל המתכונים' || picked) && <p onClick={() => {
                            handleCategoryClick('all');
                            myElement.scrollTo(0, 0);
                            window.scrollTo(0, 0);
                        }} className="float-right text-dark d-lg-none goToAllRecipes">לכל המתכונים <i
                            className="fas fa-arrow-left"/></p>}

                        {recipes.length === 0 && !notFound &&
                        <div className="d-flex justify-content-center my-3 text-dark">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}

                    </React.Fragment>}/>
                    <Route path="/recipes/id/:id" component={Recipe}/>
                    <Route path="/recipes/:id" component={Recipe}/>
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(RecipesItems);
