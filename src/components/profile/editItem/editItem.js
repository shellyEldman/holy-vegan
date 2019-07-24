import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import EditItemFinal from './editItemFinal';

const EditItem = ({items}) => {
    const [searchField, setSearchField] = useState('');
    const [id, setId] = useState('');

    const myItems = items && items.map(item => {
        if (searchField.length >= 2) {
            if (!item.name.includes(searchField)) {
                return null;
            }
        }
        return (
            <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
                <div className="card shadow-sm mb-3" style={{'minWidth': '227px'}}>
                    <img src={item.imgUrl} className="card-img-top mt-2" alt={item.name}/>
                    <div className="card-body pt-2">
                        <p className="card-title text-center font-weight-bold my-1"><span>{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</span> ש"ח</p>
                        <p className="card-text font-weight-bolder my-1">{item.name}</p>
                        <p className="card-text my-1"><span>{item.amount}</span> <span>{item.unit}</span> | <span>{item.brand}</span></p>
                        <p className="card-text my-1">
                            <small className="text-muted"><span>{item.profitability}</span></small>
                        </p>

                        <button onClick={() => setId(item.id)} type="button"
                                className="btn btn-sm mt-3 btn-block btn-warning float-right px-3 px-md-2"><span>ערוך</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    });

    const isEmpty = myItems && myItems.find((item) => item !== null);

    return (
        <div className="row editItem p-0">
            {!id && <div className="container">
                <div className="sticky-top input-group bg-light mb-3 pt-3 searchBar d-none d-lg-flex">
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
            </div>}

            {id && <EditItemFinal id={id}/>}
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
)(EditItem);
