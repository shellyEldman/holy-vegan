import React, {useState, useEffect} from 'react';
import './shop.scss';
import Items from './items';
import {Helmet} from "react-helmet";

const Shop = ({match, history, itemCategory, setItemCategory, itemSearchField, setItemSearchField}) => {
    const [categoryName, setCategoryName] = useState('כל המוצרים');
    const [itemsNames, setItemsNames] = useState([]);
    const [picked, setPicked] = useState(false);

    useEffect(() => {
        switch (itemCategory.toString()) {
            case 'all':
                setCategoryName('כל המוצרים');
                break;
            case 'vege':
                setCategoryName('ירקות');
                break;
            case 'fruits':
                setCategoryName('פירות');
                break;
            case 'legumes':
                setCategoryName('קטניות');
                break;
            case 'spices':
                setCategoryName('תבלינים');
                break;
            case 'grain':
                setCategoryName('קמחים ודגנים');
                break;
            case 'oil':
                setCategoryName('שמנים ורטבים');
                break;
            case 'canned':
                setCategoryName('שימורים וממרחים');
                break;
            case 'granola':
                setCategoryName('גרנולה וקונפיטורות');
                break;
            case 'nuts':
                setCategoryName('אגוזים ופיצוחים');
                break;
            case 'milk':
                setCategoryName('תחליפי חלב וגבינות');
                break;
            case 'east':
                setCategoryName('מהמזרח');
                break;
            case 'organic':
                setCategoryName('אורגני ובריאות');
                break;
            case 'frozen':
                setCategoryName('קפואים');
                break;
            case 'sweet':
                setCategoryName('חטיפים ומתוקים');
                break;
            default:
                setCategoryName('כל המוצרים');
        }
    }, [itemCategory]);

    const handleItemPick = (name) => {
        setItemSearchField(name);
        setPicked(true);
        setItemCategory('all');
    };

    const handleCategoryClick = (category) => {
        setItemSearchField('');
        setItemCategory(category);
        if (!match.isExact) {
            history.push('/shop');
        }
    };

    return(
        <div className="shop row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>הולי ויגן - סופרמרקט טבעוני</title>
                <meta name="description" content="סופרמרקט טבעוני 100% - משלוחים עד הבית" />
            </Helmet>
            <div className="col-lg-2 choose-items d-none d-lg-inline border-right m-0 p-0">
                <div className="categories-lg mt-3">
                    <div onClick={() => handleCategoryClick('all')} className={`${itemCategory === 'all' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>כל המוצרים</div>
                    <div onClick={() => handleCategoryClick('vege')} className={`${itemCategory === 'vege' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>ירקות</div>
                    <div onClick={() => handleCategoryClick('fruits')} className={`${itemCategory === 'fruits' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>פירות</div>
                    <div onClick={() => handleCategoryClick('legumes')} className={`${itemCategory === 'legumes' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קטניות</div>
                    <div onClick={() => handleCategoryClick('spices')} className={`${itemCategory === 'spices' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תבלינים</div>
                    <div onClick={() => handleCategoryClick('grain')} className={`${itemCategory === 'grain' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קמחים ודגנים</div>
                    <div onClick={() => handleCategoryClick('oil')} className={`${itemCategory === 'oil' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>שמנים ורטבים</div>
                    <div onClick={() => handleCategoryClick('canned')} className={`${itemCategory === 'canned' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>שימורים וממרחים</div>
                    <div onClick={() => handleCategoryClick('granola')} className={`${itemCategory === 'granola' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>גרנולה וקונפיטורות</div>
                    <div onClick={() => handleCategoryClick('nuts')} className={`${itemCategory === 'nuts' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>אגוזים ופיצוחים</div>
                    <div onClick={() => handleCategoryClick('milk')} className={`${itemCategory === 'milk' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תחליפי חלב וגבינות</div>
                    <div onClick={() => handleCategoryClick('east')} className={`${itemCategory === 'east' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>מהמזרח</div>
                    <div onClick={() => handleCategoryClick('organic')} className={`${itemCategory === 'organic' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>אורגני ובריאות</div>
                    <div onClick={() => handleCategoryClick('frozen')} className={`${itemCategory === 'frozen' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>קפואים</div>
                    <div onClick={() => handleCategoryClick('sweet')} className={`${itemCategory === 'sweet' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>חטיפים ומתוקים</div>
                </div>
            </div>

            <div className="col d-lg-none">
                <div className="input-group bg-light pt-3 searchBar-sm">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="חפש את שם המוצר.."
                           value={itemSearchField} onChange={(e) => {
                        setItemSearchField(e.target.value);
                        if (picked) {
                            setPicked(false);
                        }
                    }}/>
                    <div className="input-group-append dropdown">
                        <button className="btn btn-secondary" type="button">
                            חפש מוצר
                        </button>
                    </div>
                </div>

                <ul className={`list-group search-list-my-group ${((itemSearchField) && (itemSearchField.replace(/\s/g,"") !== "") && (!picked)) ? '' : 'd-none'}`}>
                    {itemsNames.map((name, i) => {
                        if (!name.includes(itemSearchField)) {
                            return null;
                        } else {
                            return (
                                <li onClick={() => handleItemPick(name)} key={i}
                                    className="list-group-item py-2">{name}</li>
                            )
                        }
                    })}
                </ul>
            </div>

            <Items picked={picked} setPicked={setPicked} handleItemPick={handleItemPick} setItemsNames={setItemsNames} itemsNames={itemsNames} itemCategory={itemCategory} setItemCategory={setItemCategory} categoryName={categoryName} itemSearchField={itemSearchField} setItemSearchField={setItemSearchField}/>
        </div>
    );
};

export default Shop;

