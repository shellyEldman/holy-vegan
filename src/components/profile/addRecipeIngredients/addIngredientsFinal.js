import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from 'react-router-dom';
import firebase from "../../../config/fbConfig";

const db = firebase.firestore();

const AddIngredientsFinal = ({recipe, items, itemsId, id, history}) => {
    const [searchField, setSearchField] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('recipe ingredients', recipeIngredients);
    }, [recipeIngredients]);

    const handleAddItem = (item) => {
        const newIngredient = {
            id: item.id.toString(),
            numOfItems: 1
        };
        const newIngredients = [...recipeIngredients, newIngredient];
        setRecipeIngredients(newIngredients);
    };

    const handleNumOfItems = (id, value) => {
        let ingredients = [...recipeIngredients];
        ingredients = ingredients.map(ing => {
            if (ing.id === id) {
                return {
                    id,
                    numOfItems: Number(value)
                };
            } else {
                return ing;
            }
        });
        setRecipeIngredients(ingredients);
    };

    const handleDeleteItem = (id) => {
        let ingredients = [...recipeIngredients];
        ingredients = ingredients.filter(ing => ing.id !== id);
        setRecipeIngredients(ingredients);
    };

    const handleSave = () => {
        setLoading(true);
        console.log('recipe', id, recipe);
        const changeRecipe = {...recipe, buyRecipeIngredients: recipeIngredients};
        console.log('change', changeRecipe);
        db.collection("recipes").doc(id).set({
            ...changeRecipe
        })
            .then(function () {
                console.log("Document successfully written!");
                setLoading(false);
                history.push('/');
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };

    const myItems = items && items.map(item => {
        if (searchField.length >= 2) {
            if (!item.name.includes(searchField)) {
                return null;
            }
        }
        return (
            <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
                <div className="card shadow-sm mb-3" style={{'minWidth': '227px'}}>
                    <img src={item.imgUrl} className="card-img-top mt-2" alt={item.name}
                         style={{'height': '100px', 'objectFit': 'contain'}}/>
                    <div className="card-body pt-2">
                        <p className="card-title text-center font-weight-bold my-1">
                            <span>{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</span> ש"ח</p>
                        <p className="card-text font-weight-bolder my-1">{item.name}</p>
                        <p className="card-text my-1"><span>{item.amount}</span>
                            <span>{item.unit}</span> | <span>{item.brand}</span></p>
                        <p className="card-text my-1">
                            <small className="text-muted"><span>{item.profitability}</span></small>
                        </p>
                        <button onClick={() => handleAddItem(item)} type="button"
                                className="btn btn-sm mt-1 btn-success rounded-pill float-right px-3 px-md-2">הוספה
                            למתכון
                        </button>

                    </div>
                </div>
            </div>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);

    if (!recipe) {
        return null;
    }
    return (
        <div className="container">
            <h2>הוספת/שינוי מוצרים למתכון - {recipe.recipeName}</h2>

            <div className="row">
            {recipeIngredients && recipeIngredients.map(item => {
                return (
                    <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
                        <div className="card shadow-sm mb-3" style={{'minWidth': '227px'}}>
                            <img src={itemsId[item.id].imgUrl} className="card-img-top mt-2" alt={itemsId[item.id].name}
                                 style={{'height': '100px', 'objectFit': 'contain'}}/>
                            <div className="card-body pt-2">
                                <p className="card-title text-center font-weight-bold my-1">
                                    <span>{Number.isInteger(itemsId[item.id].price) ? itemsId[item.id].price : itemsId[item.id].price.toFixed(2)}</span> ש"ח
                                </p>
                                <p className="card-text font-weight-bolder my-1">{itemsId[item.id].name}</p>
                                <p className="card-text my-1"><span>{itemsId[item.id].amount}</span>
                                    <span>{itemsId[item.id].unit}</span> | <span>{itemsId[item.id].brand}</span></p>
                                <p className="card-text my-1">
                                    <small className="text-muted"><span>{item.profitability}</span></small>
                                </p>
                                <input type="number" className="form-control" value={item.numOfItems}
                                       onChange={(e) => handleNumOfItems(item.id, e.target.value)}/>
                                <button onClick={() => handleDeleteItem(item.id)} type="button"
                                        className="btn btn-sm mt-1 btn-danger rounded-pill float-right px-3 px-md-2">מחק
                                </button>

                            </div>
                        </div>
                    </div>
                )
            })}

                <button onClick={handleSave} className="btn btn-success btn-block my-5" disabled={loading}>
                    {!loading && <span>שמור</span>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                </button>
            </div>

            <div className="container">
                <div className="input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="הקלד שם של מתכון.."
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" id="button-addon2">חפש מוצר
                        </button>
                    </div>
                </div>

                <div className="row items-list mt-3 mt-lg-0">
                    {myItems}
                    {myItems && typeof isEmpty === 'undefined' && <p className="container">מוצר לא נמצא</p>}
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;
    return {
        recipe,
        items: state.firestore.ordered.items,
        itemsId: state.firestore.data.items
    };
};


export default compose(
    withRouter,
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes'},
        {collection: 'items'}
    ])
)(AddIngredientsFinal);
