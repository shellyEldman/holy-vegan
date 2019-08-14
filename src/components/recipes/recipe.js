import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import InstagramEmbed from 'react-instagram-embed';
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import firebase from "../../config/fbConfig";
import {addItemsToCart} from '../../store/actions/shopActions';
import * as moment from 'moment';
import 'moment/locale/he';

const storage = firebase.storage();
const db = firebase.firestore();

const Recipe = ({recipe, match, auth, items, addToCart, history, otherRecipes}) => {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [wrongComment, setWrongComment] = useState('');
    const [wrongImage, setWrongImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [buyRecipeIngredients, setBuyRecipeIngredients] = useState([]);
    const [show, setShow] = useState(false);
    const [showAddToCartModal, setShowAddToCartModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [replaceItem, setReplaceItem] = useState(null);

    const myElement = document.getElementById('scrollDiv');   /* col-lg-10 */

    const handleClose = () => setShow(false);
    const handleCloseAddToCart = () => setShowAddToCartModal(false);
    const handleShow = () => setShow(true);
    const handleShowAddToCart = () => setShowAddToCartModal(true);

    useEffect(() => {
        if (myElement && !scrolled) {
            myElement.scrollTo(0, 0);
            window.scrollTo(0, 0);
            setScrolled(true);
        }
        if (recipe) {
            if (recipe.buyRecipeIngredients) {
                setBuyRecipeIngredients(recipe.buyRecipeIngredients);
            }

            try {
                const id = match.params.id;
                const haveSeen = localStorage.getItem(id);
                if (!haveSeen) {
                    localStorage.setItem(id, "true");
                    let views = recipe.views;
                    if (views) {
                        views++;
                    } else {
                        views = 1;
                    }
                    const updateRecipe = {...recipe, views};
                    db.collection("recipes").doc(id).set(updateRecipe)
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                }
            } catch (e) {
                console.log('e', e);
            }
        }
    }, [recipe, scrolled, match.params.id, myElement]);

    const handleReplaceItem = () => {
        let newBuyIngredients = [...buyRecipeIngredients];
        newBuyIngredients = newBuyIngredients.map(ing => {
            if (modalItem.id === ing.id) {
                return {
                    ...ing,
                    id: replaceItem
                };
            } else {
                return ing;
            }
        });
        setBuyRecipeIngredients(newBuyIngredients);
        setReplaceItem(null);
        setShow(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(e.target.files[0].name);
            console.log('size', e.target.files[0].size);
            if (isImage) {
                const size = e.target.files[0].size;
                if (size > (5 * 1024 * 1024)) {
                    setWrongImage('התמונה חורגת מהגודל המקסימלי');
                    setImage(null);
                } else {
                    setImage(e.target.files[0]);
                    setWrongImage('');
                }
            } else {
                setImage(null);
                setWrongImage('ניתן להעלות תמונות בלבד');
            }
        }
    };

    const handleSaveComment = () => {
        if (!comment || !userName) {
            setWrongComment('יש למלא את כל השדות החסרים');
        } else {
            setLoading(true);
            if (image) {
                const generateImageId = Math.floor(Math.random() * 1000000).toString() + image.name;
                const uploadTask = storage.ref(`comments/${match.params.id}/${generateImageId}`).put(image);
                uploadTask.on('state_changed', (snap) => {
                    // progress func
                }, (err) => {
                    // error func
                    console.log('error uploading file', err);
                    setLoading(false);
                }, () => {
                    // complete func
                    storage.ref(`comments/${match.params.id}`).child(generateImageId).getDownloadURL().then(url => {
                        console.log('url', url);
                        // update item image url
                        db.collection("comments").add({
                            recipe: {
                                name: recipe.recipeName,
                                id: match.params.id,
                                image: recipe.imgUrl
                            },
                            comment,
                            userName,
                            commentImageUrl: url,
                            imageName: generateImageId,
                            createdAt: new Date()
                        })
                            .then(function () {
                                console.log("Document successfully written!");
                                setLoading(false);
                                setCommentAdded(true);
                            })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                                setLoading(false);
                            });
                    });
                });
            } else {
                db.collection("comments").add({
                    recipe: {
                        name: recipe.recipeName,
                        id: match.params.id,
                        image: recipe.imgUrl
                    },
                    comment,
                    userName,
                    commentImageUrl: false,
                    imageName: false,
                    createdAt: new Date()
                })
                    .then(function () {
                        console.log("Document successfully written!");
                        setLoading(false);
                        setCommentAdded(true);
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        setLoading(false);
                    });
            }
        }
    };

    const handleRemoveIngredient = (id) => {
        let newIng = [...buyRecipeIngredients];
        newIng = newIng.filter(ing => ing.id !== id);
        setBuyRecipeIngredients(newIng);
    };

    const handleMinus = (id, range) => {
        let newIng = [...buyRecipeIngredients];
        newIng = newIng.map((ing => {
            if (ing.id === id && ing.numOfItems > range) {
                const newItem = {...ing, numOfItems: ing.numOfItems - range};
                return newItem;
            } else {
                return ing;
            }
        }));
        setBuyRecipeIngredients(newIng);
    };

    const handlePlus = (id, range) => {
        let newIng = [...buyRecipeIngredients];
        newIng = newIng.map((ing => {
            if (ing.id === id && ing.numOfItems < 15) {
                const newItem = {...ing, numOfItems: ing.numOfItems + range};
                return newItem;
            } else {
                return ing;
            }
        }));
        setBuyRecipeIngredients(newIng);
    };

    const finalPrice = () => {
        let price = 0;
        buyRecipeIngredients.forEach(ing => {
            const id = ing.id;
            const num = ing.numOfItems;
            const itemPrice = items[id].price;
            price += itemPrice * num;
        });
        return price;
    };

    const showModal = (item) => {
        setModalItem(item);
        handleShow();
    };

    const handleAddItemsToCart = () => {
        handleShowAddToCart();
        addToCart(buyRecipeIngredients, finalPrice());
    };

    const handleBack = () => {
        history.push('/recipes');
        myElement.scrollTo(0, 0);
        window.scrollTo(0, 0);
    };

    if (!recipe) {
        return null;
    }

    return (
        <div className="recipe mt-3 bg-light">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{recipe.recipeName} מתכון טבעוני</title>
                <meta name="description" content={recipe.introduction}/>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <Link to="/recipes" className="goBack text-dark"><i
                            className="fas fa-arrow-right mr-1"/><span>חזרה למתכונים</span></Link>
                        <h2 className="font-weight-bolder mt-3">{recipe.recipeName}</h2>
                        <p>{recipe.introduction}</p>
                        <h4 className="font-weight-bolder">מרכיבים</h4>

                        {recipe.ingredients['1'].title &&
                        <p className="mb-2 mt-3 font-weight-bolder">{recipe.ingredients['1'].title}</p>}
                        <ul className="list-group list-group-flush border-none">
                            {recipe.ingredients['1'].title && recipe.ingredients['1'].items.map((item, i) => {
                                return (
                                    <li key={i}
                                        className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : ''} ${i === recipe.ingredients['1'].items.length - 1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}>
                                        <i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                )
                            })}
                        </ul>

                        {recipe.ingredients['2'].title &&
                        <p className="mb-2 mt-3 font-weight-bolder">{recipe.ingredients['2'].title}</p>}
                        <ul className="list-group list-group-flush border-none">
                            {recipe.ingredients['2'].title && recipe.ingredients['2'].items.map((item, i) => {
                                return (
                                    <li key={i}
                                        className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : ''} ${i === recipe.ingredients['2'].items.length - 1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}>
                                        <i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                )
                            })}
                        </ul>

                        {recipe.ingredients['3'].title &&
                        <p className="mb-2 mt-3 font-weight-bolder">{recipe.ingredients['3'].title}</p>}
                        <ul className="list-group list-group-flush border-none">
                            {recipe.ingredients['3'].title && recipe.ingredients['3'].items.map((item, i) => {
                                return (
                                    <li key={i}
                                        className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : ''} ${i === recipe.ingredients['3'].items.length - 1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}>
                                        <i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                )
                            })}
                        </ul>

                        {recipe.ingredients['4'].title &&
                        <p className="mb-2 mt-3 font-weight-bolder">{recipe.ingredients['4'].title}</p>}
                        <ul className="list-group list-group-flush border-none">
                            {recipe.ingredients['4'].title && recipe.ingredients['4'].items.map((item, i) => {
                                return (
                                    <li key={i}
                                        className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : ''} ${i === recipe.ingredients['4'].items.length - 1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}>
                                        <i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                )
                            })}
                        </ul>

                        <h4 className="font-weight-bolder mt-4">הוראות הכנה</h4>
                        <ul className="list-group list-group-flush border-none">
                            {recipe.instructions.map((item, i) => {
                                return (
                                    <li key={i} className="bg-light py-1 d-flex align-items-start"><span
                                        className="mr-2 font-weight-bolder">{i + 1}.</span><span>{item}</span>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>

                    <div className="col-lg-6 cart-items">
                        {recipe.insta && <InstagramEmbed
                            url={recipe.insta}
                            // maxWidth={320}
                            hideCaption={true}
                            containerTagName='div'
                            protocol=''
                            injectScript
                        />}
                    </div>

                    {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && items && buyRecipeIngredients && buyRecipeIngredients.length > 0 &&
                    <div className="col-12 recipe-items-buy mt-5">
                        <h3 className="font-weight-bolder mb-3">רכישת מצרכים עבור המתכון</h3>

                        {modalItem && <Modal dir="rtl" show={show} onHide={handleClose}>
                            <Modal.Body dir="rtl">
                                <React.Fragment>
                                    <button onClick={handleClose} style={{"outline": "none"}} type="button"
                                            className="close float-right" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <div className="card shadow-sm mb-3 modalItem m-auto" style={{'width': '227px'}}>
                                        <img src={modalItem.imgUrl} className="card-img-top modalImg mt-2"
                                             alt={modalItem.name}/>
                                        <div className="card-body pt-2">
                                            <p className="card-title text-center font-weight-bold my-1">
                                                <span>{modalItem.price.toFixed(2)}</span> ש"ח</p>
                                            <p className="card-text font-weight-bolder my-1">{modalItem.name}</p>
                                            {!modalItem.brand &&
                                            <p className="card-text my-1">{modalItem.price.toFixed(2)} ₪
                                                ל- {modalItem.amount} {modalItem.unit}</p>}
                                            {modalItem.brand &&
                                            <p className="card-text my-1"><span>{modalItem.amount}</span>
                                                <span>{modalItem.unit}</span> | <span>{modalItem.brand}</span></p>}
                                            <p className="card-text my-1">
                                                <small className="text-muted"><span>{modalItem.profitability}</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="mt-3 mb-0">מוצרים חלופיים</h4>
                                    <hr className="my-1"/>
                                    <div className="row">
                                        {modalItem.relatedItems && modalItem.relatedItems.map(itemId => {
                                            const item = items[itemId];
                                            return (
                                                <div key={itemId} className="col-lg-6 my-3">
                                                    <div className="card shadow-sm modalItem m-auto"
                                                         style={{'width': '197px'}}>
                                                        <img src={item.imgUrl}
                                                             className="card-img-top relatedItems modalImg mt-2"
                                                             alt={item.name}/>
                                                        <div className="card-body pt-2">
                                                            <p className="card-title text-center font-weight-bold my-1">
                                                                <span>{item.price.toFixed(2)}</span> ש"ח</p>
                                                            <p className="card-text font-weight-bolder my-1">{item.name}</p>
                                                            {!item.brand &&
                                                            <p className="card-text my-1">{item.price.toFixed(2)} ₪
                                                                ל- {item.amount} {item.unit}</p>}
                                                            {item.brand &&
                                                            <p className="card-text my-1"><span>{item.amount}</span>
                                                                <span>{item.unit}</span> | <span>{item.brand}</span>
                                                            </p>}
                                                            <p className="card-text my-1">
                                                                <small className="text-muted">
                                                                    <span>{item.profitability}</span></small>
                                                            </p>
                                                            {replaceItem === itemId ?
                                                                <button
                                                                    className="btn btn-sm btn-success btn-block">מוצר
                                                                    הוחלף</button>
                                                                :
                                                                <button onClick={() => setReplaceItem(itemId)}
                                                                        className="btn btn-sm btn-secondary btn-block">החלף
                                                                    במוצר זה</button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {(!modalItem.relatedItems || modalItem.relatedItems.length === 0) &&
                                    <p className="my-2">אין מוצרים חלופיים..</p>}
                                </React.Fragment>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    סגור
                                </Button>
                                {(modalItem.relatedItems && modalItem.relatedItems.length > 0) &&
                                <Button variant="success" onClick={handleReplaceItem}>
                                    שמור שינויים
                                </Button>}
                            </Modal.Footer>
                        </Modal>}


                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {buyRecipeIngredients.map(ing => {
                                    const item = {...items[ing.id], id: ing.id};
                                    return (
                                        <li key={ing.id} className="list-group-item">
                                            <div className="row">
                                                <div
                                                    className="col-4 col-lg-2 d-flex justify-content-center align-items-center">
                                                    <img onClick={() => showModal(item)} className="view-more"
                                                         src={item.imgUrl} alt={item.name}/>
                                                </div>
                                                <div className="col-8 col-lg-10">
                                                    <div className="py-1 m-0">
                                                        <p onClick={() => handleRemoveIngredient(ing.id)}
                                                           className="float-right pl-3 text-danger remove-item d-flex align-items-center">
                                                            <span style={{'fontSize': '14px'}}>הסר</span><i
                                                            className="far fa-times-circle ml-1"/></p>
                                                    </div>
                                                    <p onClick={() => showModal(item)}
                                                       className="py-1 m-0 view-more"><span
                                                        className="font-weight-bolder">{item.name}</span>
                                                    </p>
                                                    {item.brand && <p onClick={() => showModal(item)}
                                                                      className="py-1 m-0 view-more">{item.amount} {item.unit} | {item.brand}
                                                    </p>}
                                                    {!item.brand && <p onClick={() => showModal(item)}
                                                                       className="py-1 m-0 view-more">{item.price.toFixed(2)} ₪
                                                        ל- {item.amount} {item.unit}
                                                    </p>}
                                                    <div className="btn-group mr-2 py-1" role="group"
                                                         aria-label="Basic example">
                                                        <button onClick={() => handleMinus(ing.id, item.range)}
                                                                type="button"
                                                                className="btn btn-sm btn-secondary btn-right">-
                                                        </button>
                                                        <button
                                                            className="btn btn-sm border-secondary middle">{ing.numOfItems}</button>
                                                        <button onClick={() => handlePlus(ing.id, item.range)}
                                                                type="button"
                                                                className="btn btn-sm btn-secondary btn-left">+
                                                        </button>
                                                    </div>
                                                    <small>{item.rangeUnit}</small>
                                                    <p onClick={() => showModal(item)}
                                                       className="py-1 m-0 view-more"><span><i
                                                        className="far fa-eye mr-1"/></span><span>ראה/י עוד</span></p>
                                                    <p className="float-right py-1 mb-0 mt-3 mt-lg-0"><span>מחיר:</span><span
                                                        className="font-weight-bolder ml-1">{(item.price * ing.numOfItems).toFixed(2)} ₪</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                                <li className="list-group-item d-flex flex-column pb-3">
                                    <p className="align-self-end py-1 mt-0 mb-1"><span>סה"כ לתשלום:</span><span
                                        className="font-weight-bolder ml-1">{finalPrice().toFixed(2)} ₪</span></p>
                                    <button onClick={handleAddItemsToCart}
                                            className="btn btn-success btn-block mt-1 align-self-end"><span>הוספת מוצרים לעגלה</span><i
                                        className="fas fa-cart-plus ml-2"/></button>
                                </li>
                            </ul>
                        </div>
                    </div>}

                    <Modal dir="rtl" className="modalAddToCart" show={showAddToCartModal} onHide={handleCloseAddToCart}>
                        <Modal.Header dir="rtl">
                            <Modal.Title>
                                המוצרים נוספו בהצלחה לעגלה!
                            </Modal.Title>
                            <button onClick={handleCloseAddToCart} style={{"outline": "none"}} type="button"
                                    className="close float-right" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body dir="rtl">
                            <div className="col-12 d-flex flex-column align-items-center">
                                <button onClick={() => history.push('/cart')}
                                        className="btn btn-outline-success btn-empty"><span>מעבר לקופה</span><i
                                    className="fas fa-angle-left mx-2"/></button>
                                <p className="my-3">או</p>
                                <button onClick={() => history.push('/shop')}
                                        className="btn btn-outline-success d-block btn-empty">
                                    <span>חיפוש מוצרים נוספים</span><i
                                    className="fas fa-angle-left mx-2"/></button>
                                <p className="my-3">או</p>
                                <button onClick={() => history.push('/recipes')}
                                        className="btn btn-outline-success d-block btn-empty">
                                    <span>חיפוש מתכונים נוספים</span><i
                                    className="fas fa-angle-left mx-2"/></button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddToCart}>
                                סגור
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div className="col-12 text-dark mt-3 mt-md-4 insta-follow">
                        <a href="https://www.instagram.com/holy_vegan_il/" target="_blank" rel="noopener noreferrer">
                            <h5 className="d-flex justify-content-center align-items-center text-dark font-weight-bolder">
                                <span>עקבו אחרינו באינסטגרם</span><i className="fab fa-instagram mx-2"/></h5>
                            <h5 className="text-center text-success font-italic font-weight-bolder" dir="ltr">@holy_vegan_il</h5>
                        </a>

                        <div className="d-md-none mt-3">
                            <InstagramEmbed
                                url={'https://www.instagram.com/p/B0fsqcqnyBI/'}
                                // maxWidth={320}
                                hideCaption={true}
                                containerTagName='div'
                                protocol=''
                                injectScript
                            />
                        </div>
                        <div className="row mt-3 d-none d-md-flex">
                            <div className="col-12 col-md-6 col-xl-4 d-none d-md-flex">
                                <InstagramEmbed
                                    url={'https://www.instagram.com/p/Bz_D6QyAiqg/'}
                                    maxWidth={320}
                                    hideCaption={true}
                                    containerTagName='div'
                                    protocol=''
                                    injectScript
                                />
                            </div>

                            <div className="col-12 col-md-6 col-xl-4">
                                <InstagramEmbed
                                    url={'https://www.instagram.com/p/B0fsqcqnyBI/'}
                                    maxWidth={320}
                                    hideCaption={true}
                                    containerTagName='div'
                                    protocol=''
                                    injectScript
                                />
                            </div>
                            <div className="col-12 col-xl-4 d-none d-xl-flex">
                                <InstagramEmbed
                                    url={'https://www.instagram.com/p/Bz5F9P2gjXK/'}
                                    maxWidth={320}
                                    hideCaption={true}
                                    containerTagName='div'
                                    protocol=''
                                    injectScript
                                />
                            </div>
                        </div>

                    </div>

                    {otherRecipes && <div className="col-12 text-dark mt-3 mt-md-4">
                        <h5 className="text-center text-dark font-weight-bolder">מתכונים נוספים שתאהבו <span role="img" aria-label="emoji">😋</span></h5>

                        <div className="row d-none d-md-flex mt-3">
                            <div className="col-6 col-xl-4 choose-another-recipe">
                                <div onClick={() => {
                                    history.push(`/recipes/${otherRecipes[0].id}`);
                                    myElement.scrollTo(0, 0);
                                    window.scrollTo(0, 0);
                                }} className="card shadow-sm mb-3 text-dark" style={{'maxWidth': '320px'}}>
                                    <img src={otherRecipes[0].imgUrl} className="card-img-top more-like-recipe"
                                         alt={otherRecipes[0].recipeName}/>
                                    <div className="card-body">
                                        <p className="card-text text-center font-weight-bolder">{otherRecipes[0].recipeName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-xl-4 choose-another-recipe">
                                <div onClick={() => {
                                    history.push(`/recipes/${otherRecipes[1].id}`);
                                    myElement.scrollTo(0, 0);
                                    window.scrollTo(0, 0);
                                }} className="card shadow-sm mb-3 text-dark" style={{'maxWidth': '320px'}}>
                                    <img src={otherRecipes[1].imgUrl} className="card-img-top more-like-recipe"
                                         alt={otherRecipes[1].recipeName}/>
                                    <div className="card-body">
                                        <p className="card-text text-center font-weight-bolder">{otherRecipes[1].recipeName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-xl-4 d-none d-xl-flex choose-another-recipe">
                                <div onClick={() => {
                                    history.push(`/recipes/${otherRecipes[2].id}`);
                                    myElement.scrollTo(0, 0);
                                    window.scrollTo(0, 0);
                                }} className="card shadow-sm mb-3 text-dark" style={{'maxWidth': '320px'}}>
                                    <img src={otherRecipes[2].imgUrl} className="card-img-top more-like-recipe"
                                         alt={otherRecipes[2].recipeName}/>
                                    <div className="card-body">
                                        <p className="card-text text-center font-weight-bolder">{otherRecipes[2].recipeName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="Indicators" className="carousel slide mt-3 d-md-none" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#Indicators" data-slide-to="0" className="active"/>
                                <li data-target="#Indicators" data-slide-to="1"/>
                                <li data-target="#Indicators" data-slide-to="2"/>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div onClick={() => {
                                        history.push(`/recipes/${otherRecipes[0].id}`);
                                        myElement.scrollTo(0, 0);
                                        window.scrollTo(0, 0);
                                    }} className="card shadow-sm mb-3 text-dark">
                                        <img src={otherRecipes[0].imgUrl} className="card-img-top more-like-recipe"
                                             alt={otherRecipes[0].recipeName}/>
                                        <div className="card-body">
                                            <p className="card-text text-center font-weight-bolder">{otherRecipes[0].recipeName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div onClick={() => {
                                        history.push(`/recipes/${otherRecipes[1].id}`);
                                        myElement.scrollTo(0, 0);
                                        window.scrollTo(0, 0);
                                    }} className="card shadow-sm mb-3 text-dark">
                                        <img src={otherRecipes[1].imgUrl} className="card-img-top more-like-recipe"
                                             alt={otherRecipes[1].recipeName}/>
                                        <div className="card-body">
                                            <p className="card-text text-center font-weight-bolder">{otherRecipes[1].recipeName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div onClick={() => {
                                        history.push(`/recipes/${otherRecipes[2].id}`);
                                        myElement.scrollTo(0, 0);
                                        window.scrollTo(0, 0);
                                    }}
                                         className="card shadow-sm mb-3 text-dark">
                                        <img src={otherRecipes[2].imgUrl} className="card-img-top more-like-recipe"
                                             alt={otherRecipes[2].recipeName}/>
                                        <div className="card-body">
                                            <p className="card-text text-center font-weight-bolder">{otherRecipes[2].recipeName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#Indicators" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#Indicators" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>}

                    <div onClick={handleBack} className="col-12 mt-3 d-lg-none float-right">
                        <p className="goBack text-dark float-right"><span>חזרה למתכונים</span><i
                            className="fas fa-arrow-left mx-1"/></p>
                    </div>

                    <div className="col-12 comments mt-3 mt-md-4 mb-5">
                        <div className="border-bottom border-dark pb-3 mb-0 d-flex justify-content-between">
                            <h4 className="font-weight-bolder mb-2">תגובות
                                ({recipe.comments ? recipe.comments.length : 0})</h4>
                            <button className="btn btn-sm btn-secondary px-3 py-1" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseComment" aria-expanded="false">
                                <span>הוספת תגובה</span><i className="fas fa-plus ml-2"/></button>
                        </div>

                        <div className="collapse mt-3" id="collapseComment">
                            <div className="border border-dark rounded px-3 py-2">
                                {!commentAdded && <div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="nameComment">שם:</label>
                                        <input value={userName} onChange={(e) => setUserName(e.target.value)}
                                               type="text"
                                               maxLength="17"
                                               className={`form-control ${(wrongComment && !userName) ? 'border-danger' : ''}`}
                                               id="nameComment"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment">תגובה:</label>
                                        <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                                                  maxLength="1000"
                                                  className={`form-control ${(wrongComment && !comment) ? 'border-danger' : ''}`}
                                                  id="comment" rows="3"/>
                                    </div>
                                    {wrongComment && (!userName || !comment) &&
                                    <p className="text-danger">{wrongComment}</p>}
                                    <div className="upload-btn-wrapper">
                                        <button className="btn">הוסף תמונה</button>
                                        <input onChange={handleFileChange} type="file"
                                               accept="image/x-png,image/gif,image/jpeg" name="myfile"/>
                                    </div>
                                    {wrongImage && <p className="mt-1 text-danger">{wrongImage}</p>}
                                    {image && <p className="mt-1">{image.name}</p>}
                                    <button onClick={handleSaveComment} className="btn btn-success px-5 mt-3"
                                            disabled={loading}>
                                        {!loading && <span>שמור</span>}
                                        {loading && <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>}
                                    </button>
                                    <button className="btn btn-secondary px-3 float-right mt-3" type="button"
                                            data-toggle="collapse" data-target="#collapseComment">סגור
                                    </button>
                                </div>}

                                {commentAdded && <div>
                                    <p className="text-center">תגובתך התקבלה בהצלחה</p>
                                    <h5 className="text-success text-center">תודה!</h5>
                                </div>}
                            </div>
                        </div>

                        {recipe.comments.length > 0 && recipe.comments.map((comment, i) => {
                            return (
                                <div key={i} className="border-bottom border-dark d-flex align-items-start py-3">
                                    <i className="fas fa-user-circle mr-2"/>
                                    <div>
                                            <span
                                                className="p-0 m-0 text-success font-weight-bolder mr-2">{comment.userName}</span>
                                        <small
                                            className="m-0 p-0 text-muted">{moment(comment.createdAt.toDate()).fromNow()}</small>
                                        <p className="mt-2 mb-0">{comment.comment}</p>
                                        {comment.commentImageUrl && <img className="img-response"
                                                                         src={comment.commentImageUrl}
                                                                         alt={recipe.recipeName}/>}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const recipes = state.firestore.data.recipes;
    const ordered = state.firestore.ordered.recipes;
    let otherRecipes = [];
    if (ordered && ordered.length > 0) {
        let i = 0;
        while (otherRecipes.length < 3 || i >= ordered.length) {
            if (ordered[i] && ordered[i].id !== id) {
                otherRecipes.push(ordered[i]);
            }
            i++;
        }
    }
    const recipe = recipes ? recipes[id] : null;
    return {
        recipe,
        shop: state.shop,
        auth: state.firebase.auth,
        items: state.firestore.data.items,
        otherRecipes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (items, sum) => dispatch(addItemsToCart(items, sum))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'recipes'},
        {collection: 'items'}
    ])
)(Recipe);
