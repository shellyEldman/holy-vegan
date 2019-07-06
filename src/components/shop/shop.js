import React, {useState, useEffect} from 'react';
import './shop.scss';
import Items from './items';
import {Helmet} from "react-helmet";

const Shop = () => {
    const [searchField, setSearchField] = useState('');
    const [category, setCategory] = useState('all');
    const [categoryName, setCategoryName] = useState('כל המוצרים');

    useEffect(() => {
        switch (category.toString()) {
            case 'all':
                setCategoryName('כל המוצרים');
                break;
            case 'bread':
                setCategoryName('מאפיה');
                break;
            case 'vege':
                setCategoryName('פירות וירקות');
                break;
            case 'milk':
                setCategoryName('תחליפי חלב וגבינות');
                break;
            case 'meat':
                setCategoryName('תחליפי בשר');
                break;
            case 'drink':
                setCategoryName('משקאות ואלכוהול');
                break;
            case 'cook':
                setCategoryName('בישול, אפיה ושימורים');
                break;
            case 'organic':
                setCategoryName('אורגני ובריאות');
                break;
            case 'frozen':
                setCategoryName('קפואים');
                break;
            case 'grain':
                setCategoryName('קטניות ודגנים');
                break;
            case 'sweet':
                setCategoryName('חטיפים ומתוקים');
                break;
            case 'pharm':
                setCategoryName('פארם ותינוקות');
                break;
            case 'home':
                setCategoryName('בית ובעלי-חיים');
                break;
            case 'other':
                setCategoryName('שונות');
                break;
            default:
                setCategoryName('כל המוצרים');
        }
    }, [category]);

    return(
        <div className="shop row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>סופר טבעוני</title>
                <meta name="description" content="סופרמרקט טבעוני - משלוחים עד הבית" />
                <meta name="og:title" property="og:title" content="סופרמרקט טבעוני - משלוחים עד הבית"/>
                <meta name="twitter:card" content="סופרמרקט טבעוני - משלוחים עד הבית"/>
            </Helmet>
            <div className="col-lg-2 choose-items d-none d-lg-inline border-right m-0 p-0">
                <div className="categories-lg mt-3">
                    <div onClick={() => setCategory('all')} className={`${category === 'all' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>כל המוצרים</div>
                    <div onClick={() => setCategory('bread')} className={`${category === 'bread' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>מאפיה</div>
                    <div onClick={() => setCategory('vege')} className={`${category === 'vege' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>פירות וירקות</div>
                    <div onClick={() => setCategory('milk')} className={`${category === 'milk' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תחליפי חלב וגבינות</div>
                    <div onClick={() => setCategory('meat')} className={`${category === 'meat' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תחליפי בשר</div>
                    <div onClick={() => setCategory('drink')} className={`${category === 'drink' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>משקאות ואלכוהול</div>
                    <div onClick={() => setCategory('cook')} className={`${category === 'cook' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>בישול, אפיה ושימורים</div>
                    <div onClick={() => setCategory('organic')} className={`${category === 'organic' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>אורגני ובריאות</div>
                    <div onClick={() => setCategory('frozen')} className={`${category === 'frozen' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קפואים</div>
                    <div onClick={() => setCategory('grain')} className={`${category === 'grain' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קטניות ודגנים</div>
                    <div onClick={() => setCategory('sweet')} className={`${category === 'sweet' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>חטיפים ומתוקים</div>
                    <div onClick={() => setCategory('pharm')} className={`${category === 'pharm' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>פארם ותינוקות</div>
                    <div onClick={() => setCategory('home')} className={`${category === 'home' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>בית ובעלי-חיים</div>
                    <div onClick={() => setCategory('other')} className={`${category === 'other' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>שונות</div>
                </div>
            </div>

            <div className="col d-lg-none">
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="חפש מוצר.."
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {categoryName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div onClick={() => setCategory('all')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'all' ? 'text-success' : ''}`}>כל המוצרים</div>
                            <div onClick={() => setCategory('bread')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'bread' ? 'text-success' : ''}`}>מאפיה</div>
                            <div onClick={() => setCategory('vege')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'vege' ? 'text-success' : ''}`}>פירות וירקות</div>
                            <div onClick={() => setCategory('milk')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'milk' ? 'text-success' : ''}`}>תחליפי חלב וגבינות</div>
                            <div onClick={() => setCategory('meat')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'meat' ? 'text-success' : ''}`}>תחליפי בשר</div>
                            <div onClick={() => setCategory('drink')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'drink' ? 'text-success' : ''}`}>משקאות ואלכוהול</div>
                            <div onClick={() => setCategory('cook')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'cook' ? 'text-success' : ''}`}>בישול, אפיה ושימורים</div>
                            <div onClick={() => setCategory('organic')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'organic' ? 'text-success' : ''}`}>אורגני ובריאות</div>
                            <div onClick={() => setCategory('frozen')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'frozen' ? 'text-success' : ''}`}>קפואים</div>
                            <div onClick={() => setCategory('grain')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'grain' ? 'text-success' : ''}`}>קטניות ודגנים</div>
                            <div onClick={() => setCategory('sweet')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'sweet' ? 'text-success' : ''}`}>חטיפים ומתוקים</div>
                            <div onClick={() => setCategory('pharm')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'pharm' ? 'text-success' : ''}`}>פארם ותינוקות</div>
                            <div onClick={() => setCategory('home')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 border-bottom dropdown-item ${category === 'home' ? 'text-success' : ''}`}>בית ובעלי-חיים</div>
                            <div onClick={() => setCategory('other')} data-toggle="collapse" data-target="#collapseCategories" className={`py-1 dropdown-item ${category === 'other' ? 'text-success' : ''}`}>שונות</div>
                        </div>
                    </div>
                </div>
            </div>

            <Items category={category} searchField={searchField} setSearchField={setSearchField}/>
        </div>
    );
};

export default Shop;

