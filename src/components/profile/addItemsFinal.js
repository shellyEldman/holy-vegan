import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

const AddItemsFinal = ({items, itemsId, relatedItems, setRelatedItems}) => {
    const [searchField, setSearchField] = useState('');

    const handleAddRelatedItem = (id) => {
        const newRelatedItems = [...relatedItems, id];
        setRelatedItems(newRelatedItems);
        console.log('new', id, itemsId[id]);
    };

    const myItems = items && items.map(item => {
        if (searchField.length >= 2) {
            if (!item.name.includes(searchField)) {
                return null;
            }

            return (
                <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
                    <div className="card shadow-sm mb-3" style={{'width': '200px'}}>
                        <img src={item.imgUrl} className="card-img-top mt-2" alt={item.name}/>
                        <div className="card-body pt-2">
                            <p className="card-title text-center font-weight-bold my-1">
                                <span>{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</span> ש"ח</p>
                            <p className="card-text font-weight-bolder my-1">{item.name}</p>
                            <p className="card-text my-1"><span>{item.amount}</span>
                                <span>{item.unit}</span> | <span>{item.brand}</span></p>
                            <p className="card-text my-1">
                                <small className="text-muted"><span>{item.profitability}</span></small>
                            </p>

                            {relatedItems.includes(item.id) ?
                                <button className="btn btn-success mt-3 btn-block">
                                    מוצר דומה נוסף
                                </button>
                                :
                                <button onClick={() => handleAddRelatedItem(item.id)} type="button" className="btn btn-sm mt-3 btn-block btn-warning float-right px-3 px-md-2">
                                    <span>הוסף מוצר דומה</span>
                                </button>}

                        </div>
                    </div>
                </div>
            );
        } else {return null;}
    });

    const handleRemoveRelatedItem = (id) => {
        let newRelated = [...relatedItems];
        newRelated = newRelated.filter(itemId => itemId !== id);
        setRelatedItems(newRelated);
    };

    const isEmpty = myItems && myItems.find((item) => item !== null);

    return(
        <div className="addItemsFinal my-3 col-12">
            <div className="container">

                <div className="row">
                {items && relatedItems && relatedItems.length > 0 && relatedItems.map(id => {
                    return(
                        <div className="col-sm-6 col-md-4 col-xl-3" key={id}>
                            <div className="card shadow-sm mb-3" style={{'width': '200px'}}>
                                <img src={itemsId[id].imgUrl} className="card-img-top mt-2" alt={itemsId[id].name}/>
                                <div className="card-body pt-2">
                                    <p className="card-title text-center font-weight-bold my-1">
                                        <span>{Number.isInteger(itemsId[id].price) ? itemsId[id].price : itemsId[id].price.toFixed(2)}</span> ש"ח</p>
                                    <p className="card-text font-weight-bolder my-1">{itemsId[id].name}</p>
                                    <p className="card-text my-1"><span>{itemsId[id].amount}</span>
                                        <span>{itemsId[id].unit}</span> | <span>{itemsId[id].brand}</span></p>
                                    <p className="card-text my-1">
                                        <small className="text-muted"><span>{itemsId[id].profitability}</span></small>
                                    </p>
                                    <button onClick={() => handleRemoveRelatedItem(id)} className="btn btn-danger btn-sm btn-block">הסר מוצר</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>

                <div className="input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="הקלד שם של מוצר.."
                           value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" id="button-addon2">חפש מוצר
                        </button>
                    </div>
                </div>

                <div className="row items-list mt-3 mt-lg-0">
                    {myItems}
                    {myItems && typeof isEmpty === 'undefined' && <p className="container">מתכון לא נמצא</p>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        items: state.firestore.ordered.items,
        itemsId: state.firestore.data.items
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'items', orderBy: ['order', 'desc']}
    ])
)(AddItemsFinal);