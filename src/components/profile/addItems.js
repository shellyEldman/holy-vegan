import React, {useState, useEffect} from 'react';
import firebase from '../../config/fbConfig';
import { withRouter } from 'react-router-dom';

const storage = firebase.storage();
const db = firebase.firestore();

const AddItems = ({history}) => {
    const [itemName, setItemName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [profitability, setProfitability] = useState('');
    const [order, setOrder] = useState(1);
    const [categories, setCategories] = useState([]);

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (image) {
            const uploadTask = storage.ref(`demo/shelly/addItem`).put(image);
            uploadTask.on('state_changed', (snap) => {
                // progress func
            }, (err) => {
                // error func
                console.log('error uploading file', err)
            }, () => {
                // complete func
                storage.ref('demo/shelly').child('addItem').getDownloadURL().then(url => {
                    console.log('url', url);
                    setImgUrl(url);
                });
            });
        }
    }, [image]);

    const saveImageWithTrueId = (generatedId) => {
        const uploadTask = storage.ref(`items/${generatedId}`).put(image);
        uploadTask.on('state_changed', (snap) => {
            // progress func
        }, (err) => {
            // error func
            console.log('error uploading file', err)
        }, () => {
            // complete func
            storage.ref('items').child(generatedId).getDownloadURL().then(url => {
                // update item image url
                db.collection("items").doc(generatedId).set({
                    name: itemName,
                    imgUrl: url,
                    amount,
                    unit,
                    price,
                    brand,
                    profitability,
                    order,
                    categories
                })
                    .then(function() {
                        console.log("Document successfully written!");
                        history.push('/');
                        setLoading(false);
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            });
        });
    };

    const handleCheck = (e) => {
        console.log('check', e.target.name, e.target.checked);
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
        if (itemName && image && imgUrl && amount && unit && price && brand && profitability && order && categories) {
            setLoading(true);
            db.collection("items").add({
                name: itemName,
                imgUrl,
                amount,
                unit,
                price,
                brand,
                profitability,
                order,
                categories
            })
                .then(function(docRef) {
                    console.log("Document successfully written!", docRef.id);
                    saveImageWithTrueId(docRef.id)
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.log('save error: some item is missing');
        }
    };

    return (
        <div className="row">
            <div className="col-lg-4 addItems">
                <div className="container">
                    <h5>הוספת מוצר</h5>
                        <div className="custom-file my-3">
                            <input onChange={handleFileChange} type="file" className="custom-file-input" id="customFile"/>
                            <label className="custom-file-label" htmlFor="customFile">בחירת תמונה</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">שם מוצר</label>
                            <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" className="form-control" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">כמות</label>
                            <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" className="form-control" id="amount"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">מותג</label>
                            <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" className="form-control" id="brand"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">מחיר</label>
                            <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" className="form-control" id="price"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="unit">יחידה</label>
                            <input value={unit} onChange={(e) => setUnit(e.target.value)} type="text" className="form-control" id="unit"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="profitability">כדאיות</label>
                            <input value={profitability} onChange={(e) => setProfitability(e.target.value)} type="text" className="form-control" id="profitability"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="order">סדר</label>
                            <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" className="form-control" id="order"/>
                        </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="container mb-5">
                    <h5>קטגוריות</h5>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="bread" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">מאפיה</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="vege" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">פירות וירקות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="milk" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">תחליפי חלב וגבינות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="meat" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">תחליפי בשר</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="drink" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">משקאות ואלכוהול</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="cook" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">בישול, אפיה ושימורים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="organic" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">אורגני ובריאות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="frozen" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">קפואים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="grain" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">קטניות ודגנים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="sweet" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">חטיפים ומתוקים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="pharm" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">פארם ותינוקות</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="home" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">בית ובעלי-חיים</p>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input name="other" onChange={handleCheck} type="checkbox"/>
                            </div>
                        </div>
                        <p className="form-control">שונות</p>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card mb-3 mt-3">
                    <img src={imgUrl} id="uploadedImg" className="card-img-top mt-2" alt={itemName}/>
                    <div className="card-body pt-2">
                        <p className="card-title text-center font-weight-bold my-1"><span>{price}</span> ש"ח</p>
                        <p className="card-text font-weight-bolder my-1">{itemName}</p>
                        <p className="card-text my-1"><span>{amount}</span> <span>{unit}</span> | <span>{brand}</span></p>
                        <p className="card-text my-1">
                            <small className="text-muted"><span>{profitability}</span></small>
                        </p>

                        <div className="btn-group mt-1" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-sm btn-secondary btn-right">-</button>
                            <button className="btn btn-sm border-secondary middle">1</button>
                            <button type="button" className="btn btn-sm btn-secondary btn-left">+</button>
                        </div>
                        <button type="button"
                                className="btn btn-sm mt-1 btn-success rounded-pill float-right px-3 px-md-2">הוסף לסל
                        </button>
                    </div>
                </div>

                <button onClick={handleSave} className="btn btn-success btn-block mb-5" disabled={loading}>
                    {!loading && <span>שמור</span>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                </button>
            </div>
        </div>
    );
};


export default withRouter(AddItems);