import React, {useEffect} from 'react';
import './cart.scss';
import {getCartItemsAndSum, removeItemFromCart, handleMinus, handlePlus} from '../../store/actions/shopActions';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const Cart = ({getCart, shop, items, removeItemFromCart, history, handleMinus, handlePlus}) => {
    useEffect(() => {
        // localStorage.setItem("holyVeganCartItems", null);
        // localStorage.setItem("holyVeganCartSum", null);
        getCart();
    }, [getCart]);


    return (
        <div className="cart row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            {shop.cartItems && shop.cartItems.length === 0 &&
            <div className="col-12 d-flex flex-column align-items-center">
                <h4 className="text-dark text-center my-4"><i
                    className="fas fa-shopping-cart mx-2"/><span>סל הקניות (0)</span></h4>
                <p>סל הקניות ריק..</p>
                <button onClick={() => history.push('/shop')} className="btn btn-outline-success btn-empty"><span>מעבר לחנות</span><i
                    className="fas fa-angle-left mx-2"/></button>
                <p className="my-3">או</p>
                <button onClick={() => history.push('/recipes')} className="btn btn-outline-success d-block btn-empty">
                    <span>מעבר למתכונים</span><i className="fas fa-angle-left mx-2"/></button>
            </div>}

            {items && shop.cartItems && shop.cartItems.length > 0 && <div className="col-lg-8">
                <h4 className="text-dark text-center my-4"><i
                    className="fas fa-shopping-cart mx-2"/><span>סל הקניות ({shop.cartItems.length})</span></h4>

                <div className="card mb-lg-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center">
                                    מוצר
                                </div>
                                <div className="col-8 col-lg-10">
                                    <span>פירוט</span>
                                    <span className="float-right">מחיר</span>
                                </div>
                            </div>
                        </li>
                        {items && shop.cartItems && shop.cartItems.map(ing => {
                            const item = {...items[ing.id], id: ing.id};
                            return (
                                <li key={ing.id} className="list-group-item">
                                    <div className="row">
                                        <div
                                            className="col-4 col-lg-2 d-flex justify-content-center align-items-center">
                                            <img src={item.imgUrl} alt={item.name}/>
                                        </div>
                                        <div className="col-8 col-lg-10">
                                            <p onClick={() => removeItemFromCart(ing.id, ing.numOfItems * item.price)}
                                               className="float-right pl-2 m-0 text-danger remove-item d-flex align-items-center">
                                                <span style={{'fontSize': '14px'}}>הסר</span><i
                                                className="far fa-times-circle ml-1"/></p>
                                            <p className="py-1 m-0 view-more"><span
                                                className="font-weight-bolder">{item.name}</span>
                                            </p>
                                            {item.brand &&
                                            <p className="py-1 m-0 view-more">{item.amount} {item.unit} | {item.brand}
                                            </p>}
                                            {!item.brand && <p className="py-1 m-0 view-more">{item.price.toFixed(2)} ₪
                                                ל- {item.amount} {item.unit}
                                            </p>}
                                            <div>
                                                <div className="btn-group mr-2 py-1" role="group"
                                                     aria-label="Basic example">
                                                    <button
                                                        onClick={() => handleMinus(ing.id, item.range, item.price * item.range)}
                                                        type="button"
                                                        className="btn btn-sm btn-secondary btn-right">-
                                                    </button>
                                                    <button
                                                        className="btn btn-sm border-secondary middle">{ing.numOfItems}</button>
                                                    <button
                                                        onClick={() => handlePlus(ing.id, item.range, item.price * item.range)}
                                                        type="button"
                                                        className="btn btn-sm btn-secondary btn-left">+
                                                    </button>
                                                </div>
                                                <small>{item.rangeUnit}</small>
                                            </div>
                                            <p className="float-right py-1 m-0"><span>מחיר:</span><span
                                                className="font-weight-bolder ml-1">{(item.price * ing.numOfItems).toFixed(2)} ₪</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>}
            {items && shop.cartItems && shop.cartItems.length > 0 &&
            <div className="col-lg-4 border border-top-0 shadow d-flex flex-column mt-3 pb-3">
                {shop.cartSum && <div className="card py-4 px-3">
                    <h5><span className="float-right font-weight-bolder">{shop.cartSum.toFixed(2)} ₪</span><span>סה"כ לתשלום:</span>
                    </h5>
                    <hr/>
                    <button className="btn btn-success btn-block"><span>המשך לתשלום</span><i
                        className="fas fa-lock mx-2"/></button>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">קוד קופון</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="הזן קוד קופון"/>
                    </div>
                    <button className="btn btn-outline-secondary btn-block">הפעל קופון</button>
                </div>}
            </div>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        shop: state.shop,
        auth: state.firebase.auth,
        items: state.firestore.data.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: () => dispatch(getCartItemsAndSum()),
        removeItemFromCart: (itemId, sum) => dispatch(removeItemFromCart(itemId, sum)),
        handleMinus: (id, range, sum) => dispatch(handleMinus(id, range, sum)),
        handlePlus: (id, range, sum) => dispatch(handlePlus(id, range, sum))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'items'}
    ])
)(Cart);
