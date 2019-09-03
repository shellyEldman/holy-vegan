import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import Item from './item';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
//ran ya rosh tuna
const Items = ({items, itemCategory, setItemCategory, itemSearchField, setItemSearchField, picked, setPicked, categoryName, itemsNames, setItemsNames, handleItemPick}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (items) {
            let names = [];
            items.forEach(item => {
                names.push(item.name);
            });
            setItemsNames(names);
        }
    }, [items, setItemsNames]);

    const myItems = items && items.map(item => {
        if (itemCategory !== 'all') {
            if (!item.categories.includes(itemCategory)) {
                return null;
            }
        }

        if (itemSearchField.length >= 2) {
            if (!item.name.includes(itemSearchField) && !item.brand.includes(itemSearchField)) {
                return null;
            }
        }
        return (
            <Item key={item.id} item={item}/>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);

    const handleSelectItemCategory = (category) => {
        setItemCategory(category);
        setItemSearchField('');
    };


    return (
        <div className="col-lg-10 items p-0">

            <div className="container">

                <h3 onClick={() => setOpen(!open)} className="mt-3 text-center text-dark d-lg-none"
                    style={{'cursor': 'pointer'}} data-toggle="collapse" data-target="#collapseOne">
                    <span>{categoryName}</span><i
                    className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}/></h3>
                <ul onClick={() => setOpen(!open)} id="collapseOne"
                    className="list-group text-dark collapse mb-3 d-lg-none">
                    <div onClick={() => handleSelectItemCategory('all')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`pb-1 pt-1 border-bottom list-group-item ${itemCategory === 'all' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>כל המוצרים
                    </div>
                    <div onClick={() => handleSelectItemCategory('vege')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'vege' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>ירקות
                    </div>
                    <div onClick={() => handleSelectItemCategory('fruits')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'fruits' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>פירות
                    </div>
                    <div onClick={() => handleSelectItemCategory('legumes')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'legumes' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>קטניות
                    </div>
                    <div onClick={() => handleSelectItemCategory('spices')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'spices' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>תבלינים
                    </div>
                    <div onClick={() => handleSelectItemCategory('grain')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'grain' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>קמחים ודגנים
                    </div>
                    <div onClick={() => handleSelectItemCategory('oil')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'oil' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>שמנים ורטבים
                    </div>
                    <div onClick={() => handleSelectItemCategory('canned')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'canned' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>שימורים וממרחים
                    </div>
                    <div onClick={() => handleSelectItemCategory('granola')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'granola' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>גרנולה וקונפיטורות
                    </div>
                    <div onClick={() => handleSelectItemCategory('nuts')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'nuts' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>אגוזים ופיצוחים
                    </div>
                    <div onClick={() => handleSelectItemCategory('milk')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'milk' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>תחליפי חלב וגבינות
                    </div>
                    <div onClick={() => handleSelectItemCategory('east')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'east' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>מהמזרח
                    </div>
                    <div onClick={() => handleSelectItemCategory('organic')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'organic' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>אורגני ובריאות
                    </div>
                    <div onClick={() => handleSelectItemCategory('frozen')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`py-1 border-bottom list-group-item ${itemCategory === 'frozen' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>קפואים
                    </div>
                    <div onClick={() => handleSelectItemCategory('sweet')} data-toggle="collapse"
                         data-target="#collapseOne"
                         className={`pt-1 pb-1 list-group-item ${itemCategory === 'sweet' ? 'text-light bg-success' : ''}`}
                         style={{'cursor': 'pointer'}}>חטיפים ומתוקים
                    </div>
                </ul>


                <div className="sticky-top mb-3 pt-3 bg-light searchBar d-none d-lg-block">
                    <div className="input-group">
                        <input style={{'outline': 'none'}} type="text" className="form-control"
                               placeholder="חפש את שם המוצר.."
                               value={itemSearchField} onChange={(e) => {
                            setItemSearchField(e.target.value);
                            if (picked) {
                                setPicked(false);
                            }
                        }}/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" id="button-addon2">חפש מוצר
                            </button>
                        </div>
                    </div>


                    <ul className={`list-group search-list-my-group ${((itemSearchField) && (itemSearchField.replace(/\s/g, "") !== "") && (!picked)) ? '' : 'd-none'}`}>
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

                <div className="row items-list mt-3 mt-lg-0">
                    {myItems}
                    {myItems && typeof isEmpty === 'undefined' && <p className="container">מוצר לא נמצא</p>}
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        items: state.firestore.ordered.items
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'items', orderBy: ['order', 'desc']}
    ])
)(Items);
