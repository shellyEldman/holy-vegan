import React from 'react';
import {connect} from "react-redux";
import Item from './item';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const Items = ({items, category, searchField, setSearchField}) => {

    const myItems = items && items.map(item => {
        if (category !== 'all') {
            if (!item.categories.includes(category)) {
                return null;
            }
        }

        if (searchField.length >= 2) {
            if (!item.name.includes(searchField) && !item.brand.includes(searchField)) {
                return null;
            }
        }
        return (
            <Item key={item.id} item={item}/>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);


    return (
        <div className="col-lg-10 items p-0">

            <div className="container">
                <div className="sticky-top input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
                    <input style={{'outline': 'none'}} type="text" className="form-control"
                           placeholder="חפש מוצר"
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
