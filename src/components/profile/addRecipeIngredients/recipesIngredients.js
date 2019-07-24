import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import AddIngrediantsFina from './addIngredientsFinal';


const RecipesIngredients = ({recipes}) => {
    const [searchField, setSearchField] = useState('');
    const [id, setId] = useState('');

    const myItems = recipes && recipes.map(recipe => {
        if (searchField.length >= 2) {
            if (!recipe.recipeName.includes(searchField)) {
                return null;
            }
        }
        return (
            <div key={recipe.id} className="col-sm-6 col-md-4 col-xl-3">
                <div className="card mb-3 text-dark">
                    <img src={recipe.imgUrl} className="card-img-top" alt={recipe.recipeName} style={{'height': '100px', 'objectFit': 'contain'}}/>
                    <div className="card-body">
                        <p className="card-text text-center font-weight-bolder">{recipe.recipeName}</p>
                        <button onClick={() => setId(recipe.id)} className="btn btn-warning">הוסף/שנה מוצרים</button>
                    </div>
                </div>
            </div>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);

    return(
        <div className="row add-recipe-ingredients p-0">
            {!id && <div className="container">
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
                    {myItems && typeof isEmpty === 'undefined' && <p className="container">מתכון לא נמצא</p>}
                </div>
            </div>}

            {id && <AddIngrediantsFina id={id}/>}

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
)(RecipesIngredients);
