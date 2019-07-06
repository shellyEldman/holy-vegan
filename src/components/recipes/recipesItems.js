import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Recipe from './recipe';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";


const RecipesItems = ({recipes, category, searchField, setSearchField}) => {
    const myItems = recipes && recipes.map(recipe => {
        if (category !== 'all') {
            if (!recipe.categories.includes(category)) {
                return null;
            }
        }

        if (searchField.length >= 2) {
            if (!recipe.recipeName.includes(searchField)) {
                return null;
            }
        }
        return (
            <div key={recipe.id} className="col-sm-6 col-md-4 col-xl-3">
                <Link to={`/recipes/${recipe.id}`} style={{textDecoration: 'none'}} className="subnav_add">
                    <div className="card mb-3 text-dark" >
                        <img src={recipe.imgUrl} className="card-img-top" alt={recipe.recipeName}/>
                        <div className="card-body">
                            <p className="card-text text-center font-weight-bolder">{recipe.recipeName}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);

    return (
        <div className="col-lg-10 items p-0">
            <div className="container">
                <Switch>
                    <Route exact path="/" render={() => <React.Fragment>
                        <div className="sticky-top input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                            <input style={{'outline': 'none'}} type="text" className="form-control"
                                   placeholder="הקלד שם של מתכון.."
                                   value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" id="button-addon2">חפש מתכון
                                </button>
                            </div>
                        </div>

                        <div className="row items-list mt-3 mt-lg-0">
                            {myItems}
                            {myItems && typeof isEmpty === 'undefined' && <p className="container">מתכון לא נמצא..</p>}
                        </div>
                    </React.Fragment>}/>
                    <Route exact path="/recipes" render={() => <React.Fragment>
                        <div className="sticky-top input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                            <input style={{'outline': 'none'}} type="text" className="form-control"
                                   placeholder="הקלד שם של מתכון.."
                                   value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" id="button-addon2">חפש מתכון
                                </button>
                            </div>
                        </div>

                        <div className="row items-list mt-3 mt-lg-0">
                            {myItems}
                            {myItems && typeof isEmpty === 'undefined' && <p className="container">מתכון לא נמצא..</p>}
                        </div>
                    </React.Fragment>}/>
                    <Route path="/recipes/:id" component={Recipe}/>
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        recipes: state.firestore.ordered.recipes
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes', orderBy: ['order', 'desc']}
    ])
)(RecipesItems);

