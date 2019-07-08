import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import InstagramEmbed from 'react-instagram-embed';
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";
import {Link} from "react-router-dom";
import firebase from "../../config/fbConfig";
import * as moment from 'moment';
import 'moment/locale/he';

const storage = firebase.storage();
const db = firebase.firestore();

const Recipe = ({recipe, shop, match}) => {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [wrongComment, setWrongComment] = useState('');
    const [wrongImage, setWrongImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('scrolled');
    }, []);

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

    if (!recipe) {
        return null;
    }

    return (
        <div className="recipe mt-3 bg-light">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{recipe.recipeName} מתכון טבעוני</title>
                <meta name="description" content={recipe.introduction}/>
                <meta name="keywords" content={recipe.recipeName}/>
                {/*<meta name="og:title" property="og:title" content={`${recipe.recipeName} מתכון טבעוני`}/>*/}
                {/*<meta name="twitter:card" content={`${recipe.recipeName} מתכון טבעוני`}/>*/}
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <Link to="/recipes" className="goBack text-dark"><i className="fas fa-arrow-right mr-1"/><span>חזרה למתכונים</span></Link>
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

                        {shop.canBuy &&
                        <button className="btn btn-success btn-block mt-3"><span>רכישת מוצרים עבור מתכון זה</span><i
                            className="fas fa-arrow-left ml-2"/></button>}

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

                        {shop.canBuy &&
                        <button className="btn btn-success btn-block mt-4"><span>רכישת מוצרים עבור מתכון זה</span><i
                            className="fas fa-arrow-left ml-2"/></button>}

                        {/*    <h4 className="mt-5 font-weight-bolder mb-3">רכישת מוצרים עבור המתכון</h4>*/}
                        {/*    <ul className="list-group mb-3">*/}
                        {/*        <li className="list-group-item d-flex align-items-center justify-content-between">*/}
                        {/*            <img src="http://cafe.mouse.co.il/media/t/343/306/1/file_0.jpg" alt="polenta"*/}
                        {/*                 className="img-fluid img-item-cart"/>*/}
                        {/*            <div className="">*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder">טופו אמיתי</p>*/}
                        {/*                <small className="m-0 p-0">300 גרם | כפרי בריא</small>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder"><span className="mr-1">6.70</span>*/}
                        {/*                    <small>ש"ח</small>*/}
                        {/*                </p>*/}
                        {/*                <small className="m-0 p-0 text-danger">הסר פריט</small>*/}
                        {/*            </div>*/}

                        {/*        </li>*/}
                        {/*        <li className="list-group-item d-flex align-items-center justify-content-between">*/}
                        {/*            <img src="http://cafe.mouse.co.il/media/t/343/306/1/file_0.jpg" alt="polenta"*/}
                        {/*                 className="img-fluid img-item-cart"/>*/}
                        {/*            <div className="">*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder">טופו אמיתי</p>*/}
                        {/*                <small className="m-0 p-0">300 גרם | כפרי בריא</small>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder"><span className="mr-1">6.70</span>*/}
                        {/*                    <small>ש"ח</small>*/}
                        {/*                </p>*/}
                        {/*                <small className="m-0 p-0 text-danger">הסר פריט</small>*/}
                        {/*            </div>*/}

                        {/*        </li>*/}
                        {/*        <li className="list-group-item d-flex align-items-center justify-content-between">*/}
                        {/*            <img src="http://cafe.mouse.co.il/media/t/343/306/1/file_0.jpg" alt="polenta"*/}
                        {/*                 className="img-fluid img-item-cart"/>*/}
                        {/*            <div className="">*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder">טופו אמיתי</p>*/}
                        {/*                <small className="m-0 p-0">300 גרם | כפרי בריא</small>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder"><span className="mr-1">6.70</span>*/}
                        {/*                    <small>ש"ח</small>*/}
                        {/*                </p>*/}
                        {/*                <small className="m-0 p-0 text-danger">הסר פריט</small>*/}
                        {/*            </div>*/}

                        {/*        </li>*/}
                        {/*        <li className="list-group-item d-flex align-items-center justify-content-between">*/}
                        {/*            <img src="http://cafe.mouse.co.il/media/t/343/306/1/file_0.jpg" alt="polenta"*/}
                        {/*                 className="img-fluid img-item-cart"/>*/}
                        {/*            <div className="">*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder">טופו אמיתי</p>*/}
                        {/*                <small className="m-0 p-0">300 גרם | כפרי בריא</small>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <p className="m-0 p-0 font-weight-bolder"><span className="mr-1">6.70</span>*/}
                        {/*                    <small>ש"ח</small>*/}
                        {/*                </p>*/}
                        {/*                <small className="m-0 p-0 text-danger">הסר פריט</small>*/}
                        {/*            </div>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}

                        {/*    <button className="btn btn-success float-right rounded-pill px-3 py-1"><span>הוספה לסל</span><i*/}
                        {/*        className="fas fa-cart-plus ml-2"/></button>*/}
                        {/*    <p className="font-weight-bolder mb-1">סה"כ: 273.80 ש"ח</p>*/}
                    </div>

                    <div className="col comments mt-5 mb-5">
                        <div className="border-bottom border-dark pb-3 mb-0 d-flex justify-content-between">
                            <h4 className="font-weight-bolder mb-2">תגובות
                                ({recipe.comments ? recipe.comments.length : 0})</h4>
                            <button className="btn btn-sm btn-secondary px-3 py-1" type="button" data-toggle="collapse"
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
                            return(
                                <div key={i} className="border-bottom border-dark d-flex align-items-start py-3">
                                    <i className="fas fa-user-circle mr-2"/>
                                        <div>
                                            <span className="p-0 m-0 text-success font-weight-bolder mr-2">{comment.userName}</span>
                                            <small className="m-0 p-0 text-muted">{moment(comment.createdAt.toDate()).fromNow()}</small>
                                            <p className="mt-2 mb-0">{comment.comment}</p>
                                            {comment.commentImageUrl && <img className="img-response"
                                                 src={comment.commentImageUrl}
                                                 alt={recipe.recipeName}/>}
                                        </div>
                                </div>
                            )
                        })}



                        {/*<div className="border-bottom border-dark py-3 d-flex align-items-start">*/}
                        {/*    <i className="fas fa-user-circle mr-2"/>*/}
                        {/*    <div>*/}
                        {/*        <p className="pb-0 mb-0">שלי אלדמן</p>*/}
                        {/*        <small className="m-0 p-0">23.8.2018</small>*/}
                        {/*        <p className="m-0 p-0 font-weight-bolder">יצא לי מעולה!!</p>*/}
                        {/*        <img className="img-response my-2"*/}
                        {/*             src="https://elavegan.com/wp-content/uploads/2019/01/polenta-fries-with-gluten-free-breading-and-vegan-cashew-garlic-dip.jpg"*/}
                        {/*             alt="polenta"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="border-bottom border-dark py-3 d-flex align-items-start">*/}
                        {/*    <i className="fas fa-user-circle mr-2"/>*/}
                        {/*    <div>*/}
                        {/*        <p className="pb-0 mb-0">יוגב</p>*/}
                        {/*        <small className="m-0 p-0">1.3.2019</small>*/}
                        {/*        <p className="m-0 p-0 font-weight-bolder">מתכון נהדר</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>


                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;
    return {
        recipe,
        shop: state.shop
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes'}
    ])
)(Recipe);
