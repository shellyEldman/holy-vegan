import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Recipe from './recipe';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";


const RecipesItems = ({recipes, category, setCategory, searchField, setSearchField, searchBy, setSearchBy}) => {
    const [categoryName, setCategoryName] = useState('כל המתכונים');
    const [open, setOpen] = useState(false);

    useEffect(() => {
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
            case 'rise':
                setCategoryName('תבשילים ואורז');
                break;
            case 'cheese':
                setCategoryName('גבינות');
                break;
            default:
                setCategoryName('כל המתכונים');
        }
    }, [category]);

    const myItems = recipes && recipes.map(recipe => {
        if (category !== 'all') {
            if (!recipe.categories.includes(category)) {
                return null;
            }
        }

        if (searchField.length >= 2) {
            if (searchBy === 'recipe') {
                if (!recipe.recipeName.includes(searchField)) {
                    return null;
                }
            }
            if (searchBy === 'ingredient') {
                let found = false;
                for (const key in recipe.ingredients) {
                    if (recipe.ingredients.hasOwnProperty(key)) {
                        if (recipe.ingredients[key].title.includes(searchField)) {
                            found = true;
                            break;
                        }
                        for (let i = 0; i < recipe.ingredients[key].items.length; i++) {
                            if (recipe.ingredients[key].items[i].includes(searchField)) {
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) {
                        break;
                    }
                }

                if (!found) {
                    return null;
                }
            }
        }
        return (
            <div key={recipe.id} className="col-sm-6 col-md-4 col-xl-3">
                <Link to={`/recipes/${recipe.id}`} style={{textDecoration: 'none'}} className="subnav_add">
                    <div className="card shadow-sm mb-3 text-dark">
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

    const handleSelectRecipeCategory = (category) => {
        setCategory(category);
    };

    return (
        <div className="col-lg-10 items p-0">
            <div className="container">
                <h3 onClick={() => setOpen(!open)} className="mt-3 text-center text-dark d-lg-none" style={{'cursor': 'pointer'}} data-toggle="collapse" data-target="#collapseOne"><span>{categoryName}</span><i
                    className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}/></h3>
                <ul onClick={() => setOpen(!open)} id="collapseOne" className="list-group text-dark collapse mb-3">
                    <div onClick={() => handleSelectRecipeCategory('all')} data-toggle="collapse" data-target="#collapseOne" className={`pb-1 pt-1 border-bottom list-group-item ${category === 'all' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>כל המתכונים</div>
                    <div onClick={() => handleSelectRecipeCategory('salad')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'salad' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>ירקות סלטים</div>
                    <div onClick={() => handleSelectRecipeCategory('pasta')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'pasta' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>נודלס ופסטות</div>
                    <div onClick={() => handleSelectRecipeCategory('bakery')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'bakery' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>לחם ומאפים</div>
                    <div onClick={() => handleSelectRecipeCategory('soup')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'soup' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>מרקים</div>
                    <div onClick={() => handleSelectRecipeCategory('dessert')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'dessert' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>קינוחים</div>
                    <div onClick={() => handleSelectRecipeCategory('breakfast')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'breakfast' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>ארוחות בוקר</div>
                    <div onClick={() => handleSelectRecipeCategory('dinner')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'dinner' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>מנות עיקריות</div>
                    <div onClick={() => handleSelectRecipeCategory('gluten')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'gluten' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>ללא גלוטן</div>
                    <div onClick={() => handleSelectRecipeCategory('snack')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'snack' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>חטיפים ונשנושים</div>
                    <div onClick={() => handleSelectRecipeCategory('smoothie')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'smoothie' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>סמוזי ושייקים</div>
                    <div onClick={() => handleSelectRecipeCategory('rise')} data-toggle="collapse" data-target="#collapseOne" className={`py-1 border-bottom list-group-item ${category === 'rise' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>תבשילים ואורז</div>
                    <div onClick={() => handleSelectRecipeCategory('cheese')} data-toggle="collapse" data-target="#collapseOne" className={`pt-1 pb-1 list-group-item ${category === 'cheese' ? 'text-light bg-success' : ''}`} style={{'cursor': 'pointer'}}>גבינות</div>
                </ul>

                <Switch>
                    <Route exact path={["/", "/recipes"]}  render={() => <React.Fragment>
                        <div className="sticky-top input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                            <input style={{'outline': 'none'}} type="text" className="form-control"
                                   placeholder={`${searchBy === 'recipe' ? 'הקלד שם של מתכון..' : 'הקלד שם של רכיב..'}`}
                                   value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                            <div className="input-group-append">
                                <button onClick={() => setSearchBy('recipe')}
                                        className={`btn ${searchBy === 'recipe' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                        type="button">חפש לפי מתכון
                                </button>
                                <button onClick={() => setSearchBy('ingredient')}
                                        className={`btn ${searchBy === 'ingredient' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                        type="button">חפש לפי מרכיב
                                </button>
                            </div>
                        </div>

                        <div className="row items-list mt-3 mt-lg-0">
                            {myItems}
                            {myItems && typeof isEmpty === 'undefined' && <p className="container">מתכון לא נמצא..</p>}
                        </div>

                        {categoryName !== 'כל המתכונים' && <p onClick={() => {
                            setCategory('all');
                            setSearchField('');
                        }} className="float-right text-dark d-lg-none goToAllRecipes">לכל המתכונים <i className="fas fa-arrow-left"/></p>}

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

