import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './recipes.scss';
import RecipesItems from './recipesItems';


const Recipes = ({match, history, category, setCategory}) => {
    const [searchField, setSearchField] = useState('');
    const [searchBy, setSearchBy] = useState('recipe');
    const [searchByName, setSearchByName] = useState('חפש לפי שם המתכון');

    const handleCategoryClick = (category) => {
        setCategory(category);
        if (!match.isExact) {
            history.push('/recipes');
        }
    };

    return(
        <div className="recipes row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>הולי ויגן - מתכונים טבעוניים</title>
                <meta name="description" content="מגוון מתכונים טבעוניים וללא גלוטן" />
                <meta name="keywords" content="מתכונים טבעוניים, הולי ויגן, סופר טבעוני, מצרכים טבעוניים, טבעונות, טבעוני, מתכונים, סופרמרקט טבעוני, חנות טבעונית, מתכונים ללא גלוטן"/>
                {/*<meta name="og:title" property="og:title" content="מגוון מתכונים טבעוניים וללא גלוטן"/>*/}
                {/*<meta name="twitter:card" content="מגוון מתכונים טבעוניים וללא גלוטן"/>*/}
            </Helmet>
            <div className="col-lg-2 choose-items d-none d-lg-inline border-right shadow-sm m-0 p-0">
                <div className="categories-lg mt-3 text-dark">
                    <div onClick={() => handleCategoryClick('all')} className={`${category === 'all' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>כל המתכונים</div>
                    <div onClick={() => handleCategoryClick('salad')} className={`${category === 'salad' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>סלטים</div>
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

            <Route exact path={["/", "/recipes"]} render={() => <div className="col d-lg-none">
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder={`${searchBy === 'recipe' ? 'חפש מתכון..' : 'חפש מרכיב..'}`}
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-1">{searchByName}</span>
                        </button>
                        <div className="dropdown-menu my-0 py-0" aria-labelledby="dropdownMenuButton">
                            <div onClick={() => {
                                setSearchByName('חפש לפי שם המתכון');
                                setSearchBy('recipe');
                            }} data-toggle="collapse" data-target="#collapseCategories" className={`py-2 border-bottom dropdown-item`} style={{'cursor': 'pointer'}}>חפש לפי שם המתכון</div>
                            <div onClick={() => {
                                setSearchByName('חפש לפי שם המרכיב');
                                setSearchBy('ingredient');
                            }} data-toggle="collapse" data-target="#collapseCategories" className={`py-2 dropdown-item`} style={{'cursor': 'pointer'}}>חפש לפי שם המרכיב</div>
                        </div>
                    </div>
                </div>
            </div>}/>

            <RecipesItems searchBy={searchBy} setSearchBy={setSearchBy} category={category} setCategory={setCategory} searchField={searchField} setSearchField={setSearchField}/>
        </div>
    );
};

export default Recipes;