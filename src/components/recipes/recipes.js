import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './recipes.scss';
import RecipesItems from './recipesItems';


const Recipes = ({match, history}) => {
    const [searchField, setSearchField] = useState('');
    const [category, setCategory] = useState('all');
    const [categoryName, setCategoryName] = useState('כל המוצרים');

    useEffect(() => {
        switch (category.toString()) {
            case 'all':
                setCategoryName('כל המתכונים');
                break;
            case 'salad':
                setCategoryName('סלטים');
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

    const handleCategoryClick = (category) => {
        setCategory(category);
        if (!match.isExact) {
            history.push('/recipes');
        }
    };

    return(
        <div className="recipes row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>מתכונים טבעוניים</title>
                <meta name="description" content="מגוון מתכונים טבעוניים וללא גלוטן" />
                <meta name="og:title" property="og:title" content="מגוון מתכונים טבעוניים וללא גלוטן"/>
                <meta name="twitter:card" content="מגוון מתכונים טבעוניים וללא גלוטן"/>
            </Helmet>
            <div className="col-lg-2 choose-items d-none d-lg-inline border-right m-0 p-0">
                <div className="categories-lg mt-3">
                    <div onClick={() => handleCategoryClick('all')} className={`${category === 'all' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>כל המתכונים</div>
                    <div onClick={() => handleCategoryClick('salad')} className={`${category === 'salad' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>סלטים</div>
                    <div onClick={() => handleCategoryClick('pasta')} className={`${category === 'pasta' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>נודלס ופסטות</div>
                    <div onClick={() => handleCategoryClick('bakery')} className={`${category === 'bakery' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>לחם ומאפים</div>
                    <div onClick={() => handleCategoryClick('soup')} className={`${category === 'soup' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>מרקים</div>
                    <div onClick={() => handleCategoryClick('dessert')} className={`${category === 'dessert' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קינוחים</div>
                    <div onClick={() => handleCategoryClick('breakfast')} className={`${category === 'breakfast' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>ארוחות בוקר</div>
                    <div onClick={() => handleCategoryClick('dinner')} className={`${category === 'dinner' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>מנות עיקריות</div>
                    <div onClick={() => handleCategoryClick('gluten')} className={`${category === 'gluten' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>ללא גלוטן</div>
                    <div onClick={() => handleCategoryClick('snack')} className={`${category === 'snack' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>חטיפים ונשנושים</div>
                    <div onClick={() => handleCategoryClick('smoothie')} className={`${category === 'smoothie' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>סמוזי ושייקים</div>
                    <div onClick={() => handleCategoryClick('rise')} className={`${category === 'rise' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תבשילים ואורז</div>
                    <div onClick={() => handleCategoryClick('cheese')} className={`${category === 'cheese' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>גבינות</div>
                </div>
            </div>

            <Route exact path="/" render={() => <div className="col d-lg-none">
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="חפש מתכון.."
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {categoryName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div onClick={() => setCategory('all')} data-toggle="collapse" data-target="#collapseCategories" className={`pb-1 pt-0 border-bottom dropdown-item ${category === 'all' ? 'text-success' : ''}`}>כל המוצרים</div>
                            <div onClick={() => setCategory('salad')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'salad' ? 'text-success' : ''}`}>סלטים</div>
                            <div onClick={() => setCategory('pasta')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'pasta' ? 'text-success' : ''}`}>נודלס ופסטות</div>
                            <div onClick={() => setCategory('bakery')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'bakery' ? 'text-success' : ''}`}>לחם ומאפים</div>
                            <div onClick={() => setCategory('soup')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'soup' ? 'text-success' : ''}`}>מרקים</div>
                            <div onClick={() => setCategory('dessert')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'dessert' ? 'text-success' : ''}`}>קינוחים</div>
                            <div onClick={() => setCategory('breakfast')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'breakfast' ? 'text-success' : ''}`}>ארוחות בוקר</div>
                            <div onClick={() => setCategory('dinner')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'dinner' ? 'text-success' : ''}`}>מנות עיקריות</div>
                            <div onClick={() => setCategory('gluten')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'gluten' ? 'text-success' : ''}`}>ללא גלוטן</div>
                            <div onClick={() => setCategory('snack')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'snack' ? 'text-success' : ''}`}>חטיפים ונשנושים</div>
                            <div onClick={() => setCategory('smoothie')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'smoothie' ? 'text-success' : ''}`}>סמוזי ושייקים</div>
                            <div onClick={() => setCategory('rise')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'rise' ? 'text-success' : ''}`}>תבשילים ואורז</div>
                            <div onClick={() => setCategory('cheese')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'cheese' ? 'text-success' : ''}`}>גבינות</div>
                        </div>
                    </div>
                </div>
            </div>}/>
            <Route exact path="/recipes" render={() => <div className="col d-lg-none">
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="חפש מתכון.."
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {categoryName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div onClick={() => setCategory('all')} data-toggle="collapse" data-target="#collapseCategories" className={`pb-1 pt-0 border-bottom dropdown-item ${category === 'all' ? 'text-success' : ''}`}>כל המוצרים</div>
                            <div onClick={() => setCategory('salad')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'salad' ? 'text-success' : ''}`}>סלטים</div>
                            <div onClick={() => setCategory('pasta')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'pasta' ? 'text-success' : ''}`}>נודלס ופסטות</div>
                            <div onClick={() => setCategory('bakery')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'bakery' ? 'text-success' : ''}`}>לחם ומאפים</div>
                            <div onClick={() => setCategory('soup')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'soup' ? 'text-success' : ''}`}>מרקים</div>
                            <div onClick={() => setCategory('dessert')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'dessert' ? 'text-success' : ''}`}>קינוחים</div>
                            <div onClick={() => setCategory('breakfast')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'breakfast' ? 'text-success' : ''}`}>ארוחות בוקר</div>
                            <div onClick={() => setCategory('dinner')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'dinner' ? 'text-success' : ''}`}>מנות עיקריות</div>
                            <div onClick={() => setCategory('gluten')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'gluten' ? 'text-success' : ''}`}>ללא גלוטן</div>
                            <div onClick={() => setCategory('snack')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'snack' ? 'text-success' : ''}`}>חטיפים ונשנושים</div>
                            <div onClick={() => setCategory('smoothie')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'smoothie' ? 'text-success' : ''}`}>סמוזי ושייקים</div>
                            <div onClick={() => setCategory('rise')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'rise' ? 'text-success' : ''}`}>תבשילים ואורז</div>
                            <div onClick={() => setCategory('cheese')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'cheese' ? 'text-success' : ''}`}>גבינות</div>
                        </div>
                    </div>
                </div>
            </div>}/>


            <RecipesItems category={category} searchField={searchField} setSearchField={setSearchField}/>
        </div>
    );
};

export default Recipes;