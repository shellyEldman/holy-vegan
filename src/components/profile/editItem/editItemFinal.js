import React, {useState, useEffect} from 'react';
import firebase from "../../../config/fbConfig";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from 'react-router-dom';

const storage = firebase.storage();
const db = firebase.firestore();

const EditItemFinal = ({item, id, history, itemsId, items}) => {
    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [profitability, setProfitability] = useState('');
    const [order, setOrder] = useState(1);
    const [categories, setCategories] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [range, setRange] = useState(1);
    const [rangeUnit, setRangeUnit] = useState('');

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setImgUrl(item.imgUrl);
            setAmount(item.amount);
            setBrand(item.brand);
            setOrder(item.order);
            setCategories(item.categories);
            setPrice(item.price);
            setProfitability(item.profitability);
            setUnit(item.unit);
            if (item.relatedItems) {
                setRelatedItems(item.relatedItems);
            }
            if (item.range) {
                setRange(item.range);
            }
            if (item.rangeUnit) {
               setRangeUnit(item.rangeUnit);
            }
        }
    }, [item]);

    useEffect(() => {
        if (image) {
            const uploadTask = storage.ref(`demo/shelly/editItem`).put(image);
            uploadTask.on('state_changed', (snap) => {
                // progress func
            }, (err) => {
                // error func
                console.log('error uploading file', err)
            }, () => {
                // complete func
                storage.ref('demo/shelly').child('editItem').getDownloadURL().then(url => {
                    console.log('url', url);
                    setImgUrl(url);
                });
            });
        }
    }, [image]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCheck = (e) => {
        if (e.target.checked) {
            const updateCategories = [...categories, e.target.name];
            setCategories(updateCategories);
        } else {
            const updateCategories = [...categories];
            const index = updateCategories.indexOf(e.target.name);
            if (index > -1) {
                updateCategories.splice(index, 1);
            }
            setCategories(updateCategories);
        }
    };

    const handleSave = () => {
        if (name && imgUrl && amount && unit && price && profitability && order && categories) {
            setLoading(true);
            if (image) {
                const uploadTask = storage.ref(`items/${id}`).put(image);
                uploadTask.on('state_changed', (snap) => {
                    // progress func
                }, (err) => {
                    // error func
                    console.log('error uploading file', err)
                }, () => {
                    // complete func
                    storage.ref('items').child(id).getDownloadURL().then(url => {
                        // update item image url
                        db.collection("items").doc(id).set({
                            imgUrl: url,
                            name,
                            amount,
                            unit,
                            price,
                            brand,
                            profitability,
                            order,
                            categories,
                            relatedItems,
                            range,
                            rangeUnit
                        })
                            .then(function () {
                                console.log("Document successfully written!");
                                setLoading(false);
                                history.push('/shop');
                            })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });
                    });
                });
            } else {
                db.collection("items").doc(id).set({
                    imgUrl,
                    name,
                    amount,
                    unit,
                    price,
                    brand,
                    profitability,
                    order,
                    categories,
                    relatedItems,
                    range,
                    rangeUnit
                })
                    .then(function () {
                        console.log("Document successfully written!");
                        setLoading(false);
                        history.push('/shop');
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            }
        } else {
            console.log('save error: some item is missing');
        }
    };

    const handleDelete = () => {
        setLoading(true);
        db.collection("items").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
            storage.ref('items').child(id).delete().then(function () {
                // File deleted successfully
                console.log("image successfully deleted!");
                setLoading(false);
                history.push('/shop');
            }).catch(function (error) {
                // Uh-oh, an error occurred!
                console.error("Error removing image from storage: ", error);
            });
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    };

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

    return (
        <div className="row editItemFinal">
            <div className="col-lg-4 addItems">
                <div className="container">
                    <h5>הוספת מוצר</h5>
                    <div className="custom-file my-3">
                        <input onChange={handleFileChange} type="file" className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">בחירת תמונה</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">שם מוצר</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text"
                               className="form-control" id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">כמות</label>
                        <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number"
                               className="form-control" id="amount"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">מותג</label>
                        <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text"
                               className="form-control" id="brand"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">מחיר</label>
                        <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number"
                               className="form-control" id="price"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">יחידה</label>
                        <input value={unit} onChange={(e) => setUnit(e.target.value)} type="text"
                               className="form-control" id="unit"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="profitability">כדאיות</label>
                        <input value={profitability} onChange={(e) => setProfitability(e.target.value)} type="text"
                               className="form-control" id="profitability"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="order">סדר</label>
                        <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number"
                               className="form-control" id="order"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="range">קפיצות של</label>
                        <input value={range} onChange={(e) => setRange(Number(e.target.value))} type="number"
                               className="form-control" id="range"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rangeUnit">מידות של קפיצה</label>
                        <input value={rangeUnit} onChange={(e) => setRangeUnit(e.target.value)} type="text"
                               className="form-control" id="rangeUnit"/>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="container mb-5">
                    <h5>קטגוריות</h5>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="vege" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'vege')}/>
                            </div>
                        </div>
                        <p className="form-control">ירקות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="fruits" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'fruits')}/>
                            </div>
                        </div>
                        <p className="form-control">פירות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="legumes" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'legumes')}/>
                            </div>
                        </div>
                        <p className="form-control">קטניות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="spices" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'spices')}/>
                            </div>
                        </div>
                        <p className="form-control">תבלינים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="grain" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'grain')}/>
                            </div>
                        </div>
                        <p className="form-control">קמחים ודגנים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="oil" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'oil')}/>
                            </div>
                        </div>
                        <p className="form-control">שמנים ורטבים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="canned" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'canned')}/>
                            </div>
                        </div>
                        <p className="form-control">שימורים וממרחים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="granola" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'granola')}/>
                            </div>
                        </div>
                        <p className="form-control">גרנולה וקונפיטורות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="nuts" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'nuts')}/>
                            </div>
                        </div>
                        <p className="form-control">אגוזים ופיצוחים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="milk" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'milk')}/>
                            </div>
                        </div>
                        <p className="form-control">תחליפי חלב וגבינות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="east" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'east')}/>
                            </div>
                        </div>
                        <p className="form-control">מהמזרח</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="organic" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'organic')}/>
                            </div>
                        </div>
                        <p className="form-control">אורגני ובריאות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="frozen" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'frozen')}/>
                            </div>
                        </div>
                        <p className="form-control">קפואים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="sweet" onChange={handleCheck} type="checkbox"
                                       checked={categories.find((c) => c === 'sweet')}/>
                            </div>
                        </div>
                        <p className="form-control">חטיפים ומתוקים</p>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card mb-3 mt-3">
                    <img src={imgUrl} id="uploadedImg" className="card-img-top mt-2" alt={name}/>
                    <div className="card-body pt-2">
                        <p className="card-title text-center font-weight-bold my-1"><span>{price}</span> ש"ח</p>
                        <p className="card-text font-weight-bolder my-1">{name}</p>
                        <p className="card-text my-1"><span>{amount}</span> <span>{unit}</span> | <span>{brand}</span>
                        </p>
                        <p className="card-text my-1">
                            <small className="text-muted"><span>{profitability}</span></small>
                        </p>

                        <div className="btn-group mt-1" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-sm btn-secondary btn-right">-</button>
                            <button className="btn btn-sm border-secondary middle">1</button>
                            <button type="button" className="btn btn-sm btn-secondary btn-left">+</button>
                        </div>
                        <p className="d-inline mx-2">{rangeUnit}</p>
                        <button type="button"
                                className="btn btn-sm mt-3 btn-success btn-block float-right px-3 px-md-2">הוסף לסל
                        </button>
                    </div>
                </div>

                <button onClick={handleDelete} className="btn btn-danger btn-block mb-5" disabled={loading}>
                    {!loading && <span>מחק מוצר</span>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                </button>
            </div>

            <div className="col-12 mb-3">
                <div className="container">
                    <h3>מוצרים דומים</h3>
                    <div className="row">
                        {item && relatedItems && relatedItems.length > 0 && relatedItems.map(id => {
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
                        {myItems && typeof isEmpty === 'undefined' && <p className="container">מוצר לא נמצא</p>}
                    </div>
                </div>
            </div>

            <button onClick={handleSave} className="btn btn-success btn-block mb-5" disabled={loading}>
                {!loading && <span>שמור</span>}
                {loading && <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                </div>}
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.id;
    const items = state.firestore.data.items;
    const item = items ? items[id] : null;
    return {
        item,
        itemsId: state.firestore.data.items,
        items: state.firestore.ordered.items
    };
};


export default compose(
    withRouter,
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'items'}
    ])
)(EditItemFinal);