import React, {useState, useEffect} from 'react';
import {Modal, Button} from "react-bootstrap";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {firestoreConnect} from "react-redux-firebase";
import firebase from "../../../config/fbConfig";
import InstagramEmbed from "react-instagram-embed";

const storage = firebase.storage();
const db = firebase.firestore();

const MyModal = ({handleClose, modalShow, modalItem, modalIndex, instructions, setInstructions, modalGroup, ingredients, setIngredients}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
      if(modalItem) {
          setValue(modalItem);
      }
  }, [modalItem]);

  const handleSave = () => {
      if (!modalGroup) {
          let newInstructions = [...instructions];
          newInstructions[Number(modalIndex)] = value;
          setInstructions(newInstructions);
          handleClose();
      } else {
          let newItems = [...ingredients[modalGroup].items];
          newItems[modalIndex] = value;
          const newIngredients = {...ingredients, [modalGroup]: {...ingredients[modalGroup], items: newItems}};
          setIngredients(newIngredients);
          handleClose();
      }
  };

  return(
      <Modal className="modal" show={modalShow} onHide={handleClose}>
          <Modal.Header>
              <Modal.Title>ערוך הוראת הכנה</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="form-group mt-5">
                  <label htmlFor="editInstruction">הוראת הכנה:</label>
                  <input value={value} onChange={(e) => setValue(e.target.value)} type="text"
                         className="form-control" id="editInstruction"/>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  סגור
              </Button>
              <Button className="mx-3" variant="primary" onClick={handleSave}>
                  שמור שינויים
              </Button>
          </Modal.Footer>
      </Modal>
  );
};

const EditFinal = ({recipe, history, id}) => {
    const [recipeName, setRecipeName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [image, setImage] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [order, setOrder] = useState(1);
    const [ingredientName, setIngredientName] = useState({
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    });
    const [ingredients, setIngredients] = useState({
        '1': {
            title: '',
            items: []
        },
        '2': {
            title: '',
            items: []
        },
        '3': {
            title: '',
            items: []
        },
        '4': {
            title: '',
            items: []
        }
    });
    const [instructions, setInstructions] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [categories, setCategories] = useState([]);
    const [insta, setInsta] = useState('');
    const [comments, setComments] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModelItem] = useState('');
    const [modalIndex, setModelIndex] = useState('');
    const [modalGroup, setModalGroup] = useState('');

    const handleClose = () => {
        setModalShow(false);
    };

    const handleShow = () => {
        setModalShow(true);
    };

    useEffect(() => {
        if (recipe) {
            setRecipeName(recipe.recipeName);
            setIntroduction(recipe.introduction);
            setImgUrl(recipe.imgUrl);
            setOrder(recipe.order);
            setIngredients(recipe.ingredients);
            setInstructions(recipe.instructions);
            setCategories(recipe.categories);
            setInsta(recipe.insta);
            setComments(recipe.comments);
            if (recipe.buyRecipeIngredients) {
                setRecipeIngredients(recipe.buyRecipeIngredients);
            }
        }
    }, [recipe]);

    useEffect(() => {
        if (image) {
            const uploadTask = storage.ref(`demo/shelly/editRecipe`).put(image);
            uploadTask.on('state_changed', (snap) => {
                // progress func
            }, (err) => {
                // error func
                console.log('error uploading file', err)
            }, () => {
                // complete func
                storage.ref('demo/shelly').child('editRecipe').getDownloadURL().then(url => {
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
    const handleGroupNameChange = (e, group) => {
        console.log('e', e.target.value, group);
        const newGroup = {...ingredients[group], title: e.target.value};
        setIngredients({...ingredients, [group]: newGroup})
    };
    const handleAddIngredient = (group) => {
        if (ingredientName[group]) {
            setIngredients({
                ...ingredients,
                [group]: {...ingredients[group], items: [...ingredients[group].items, ingredientName[group]]}
            });
            setIngredientName({...ingredientName, [group]: ''});
        }
    };
    const displayIngredients = (group) => {
        const arr = [];
        ingredients[group].items.forEach((item, i) => {
            arr.push(<div key={i} className="my-2">
                <span key={i}>{item}</span>
                <button onClick={() => handleRemoveIngredient(item, group)} className="btn btn-sm btn-danger mx-2">הסר
                </button>
                <button onClick={() => handleEditIngredients(item, i, group)} className="btn btn-sm btn-warning mx-2">ערוך
                </button>
            </div>)
        });
        return arr;
    };
    const handleEditIngredients = (item, index, group) => {
        setModelItem(item);
        setModelIndex(index);
        setModalGroup(group);
        handleShow();
    };
    const displayInstructions = () => {
        const arr = [];
        instructions.forEach((item, i) => {
            arr.push(<div key={i} className="my-2">
                <span key={i}>{item}</span>
                <button onClick={() => handleRemoveInstruction(item)} className="btn btn-sm btn-danger mx-2">הסר
                </button>
                <button onClick={() => handleEditInstruction(item, i)} className="btn btn-sm btn-warning mx-2">ערוך
                </button>
            </div>)
        });
        return arr;
    };
    const handleEditInstruction = (item, index) => {
        setModelItem(item);
        setModelIndex(index);
        setModalGroup('');
        handleShow();
    };
    const handleRemoveInstruction = (itemName) => {
        let newArr = [...instructions];
        const index = newArr.indexOf(itemName);
        if (index > -1) {
            newArr.splice(index, 1);
            setInstructions(newArr);
        }
    };
    const handleRemoveIngredient = (itemName, group) => {
        let newArr = [...ingredients[group].items];
        const index = newArr.indexOf(itemName);
        if (index > -1) {
            newArr.splice(index, 1);
            setIngredients({...ingredients, [group]: {...ingredients[group], items: newArr}});
        }
    };
    const handleAddInstruction = () => {
        if (instruction) {
            setInstructions([...instructions, instruction]);
            setInstruction('');
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
        if (recipeName && imgUrl && instructions && categories && insta) {
            setLoading(true);
            if (image) {
                const uploadTask = storage.ref(`recipes/${id}`).put(image);
                uploadTask.on('state_changed', (snap) => {
                    // progress func
                }, (err) => {
                    // error func
                    console.log('error uploading file', err)
                }, () => {
                    // complete func
                    storage.ref('recipes').child(id).getDownloadURL().then(url => {
                        // update item image url
                        db.collection("recipes").doc(id).set({
                            recipeName,
                            introduction,
                            ingredients,
                            instructions,
                            imgUrl: url,
                            categories,
                            insta,
                            order,
                            comments,
                            buyRecipeIngredients: recipeIngredients
                        })
                            .then(function () {
                                console.log("Document successfully written!");
                                setLoading(false);
                                history.push('/');
                            })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });
                    });
                });
            } else {
                db.collection("recipes").doc(id).set({
                    recipeName,
                    introduction,
                    ingredients,
                    instructions,
                    imgUrl,
                    categories,
                    insta,
                    order,
                    comments,
                    buyRecipeIngredients: recipeIngredients
                })
                    .then(function () {
                        console.log("Document successfully written!");
                        setLoading(false);
                        history.push('/');
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            }
        } else {
            console.log('save error: some item is missing');
        }
    };

    const handleDeleteRecipe = () => {
        setLoading(true);
        db.collection("recipes").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            storage.ref('recipes').child(id).delete().then(function() {
                // File deleted successfully
                console.log("image successfully deleted!");
                setLoading(false);
                history.push('/');
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.error("Error removing image from storage: ", error);
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    return(
        <div className="container mb-5">
            <h2>ערוך מתכון</h2>
            <div className="row addRecipe">
                <div className="col-lg-4 mb-5">
                    <div className="container">
                        <div className="form-group">
                            <label htmlFor="name">שם מוצר</label>
                            <input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} type="text"
                                   className="form-control" id="name"/>
                        </div>
                        <div className="custom-file my-3">
                            <input onChange={handleFileChange} type="file" className="custom-file-input"
                                   id="customFile"/>
                            <label className="custom-file-label" htmlFor="customFile">בחירת תמונה</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="order">סדר</label>
                            <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" className="form-control" id="order"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="introduction">הקדמה</label>
                            <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                                      className="form-control" id="introduction" rows="3"/>
                        </div>

                        <h4>מרכיבים</h4>

                        <div className="form-group mt-3">
                            <label htmlFor="nameGroup1">שם קבוצה 1</label>
                            <input value={ingredients['1'].title} onChange={(e) => handleGroupNameChange(e, '1')}
                                   type="text"
                                   className="form-control" id="nameGroup1"/>
                        </div>

                        {displayIngredients('1')}

                        <div className="input-group mb-3">
                            <input value={ingredientName['1']}
                                   onChange={(e) => setIngredientName({...ingredientName, '1': e.target.value})}
                                   type="text"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <button onClick={() => handleAddIngredient('1')} className="btn btn-outline-secondary"
                                        type="button">
                                    הוסף רכיב
                                </button>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="nameGroup1">שם קבוצה 2</label>
                            <input value={ingredients['2'].title} onChange={(e) => handleGroupNameChange(e, '2')}
                                   type="text"
                                   className="form-control" id="nameGroup1"/>
                        </div>

                        {displayIngredients('2')}

                        <div className="input-group mb-3">
                            <input value={ingredientName['2']}
                                   onChange={(e) => setIngredientName({...ingredientName, '2': e.target.value})}
                                   type="text"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <button onClick={() => handleAddIngredient('2')} className="btn btn-outline-secondary"
                                        type="button">
                                    הוסף רכיב
                                </button>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="nameGroup1">שם קבוצה 3</label>
                            <input value={ingredients['3'].title} onChange={(e) => handleGroupNameChange(e, '3')}
                                   type="text"
                                   className="form-control" id="nameGroup1"/>
                        </div>

                        {displayIngredients('3')}

                        <div className="input-group mb-3">
                            <input value={ingredientName['3']}
                                   onChange={(e) => setIngredientName({...ingredientName, '3': e.target.value})}
                                   type="text"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <button onClick={() => handleAddIngredient('3')} className="btn btn-outline-secondary"
                                        type="button">
                                    הוסף רכיב
                                </button>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="nameGroup1">שם קבוצה 4</label>
                            <input value={ingredients['4'].title} onChange={(e) => handleGroupNameChange(e, '4')}
                                   type="text"
                                   className="form-control" id="nameGroup1"/>
                        </div>

                        {displayIngredients('4')}

                        <div className="input-group mb-3">
                            <input value={ingredientName['4']}
                                   onChange={(e) => setIngredientName({...ingredientName, '4': e.target.value})}
                                   type="text"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <button onClick={() => handleAddIngredient('4')} className="btn btn-outline-secondary"
                                        type="button">
                                    הוסף רכיב
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-lg-4 mb-5">
                    <div className="container">

                        <h4>הוראות הכנה</h4>

                        {displayInstructions()}

                        <MyModal ingredients={ingredients} setIngredients={setIngredients} modalGroup={modalGroup} handleClose={handleClose} modalShow={modalShow} modalItem={modalItem} modalIndex={modalIndex} instructions={instructions} setInstructions={setInstructions}/>

                        <div className="form-group">
                            <label htmlFor="instructions">הוראת הכנה</label>
                            <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)}
                                      className="form-control" id="instructions" rows="5"/>
                        </div>

                        <button onClick={handleAddInstruction} className="btn btn-secondary">הוסף הוראת הכנה</button>

                        <div className="form-group mt-5">
                            <label htmlFor="insta">הוסף לינק לדף האינסטגרם</label>
                            <input value={insta} onChange={(e) => setInsta(e.target.value)} type="text"
                                   className="form-control" id="insta"/>
                        </div>

                        <h5>קטגוריות</h5>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="salad" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'salad')}/>
                                </div>
                            </div>
                            <p className="form-control">ירקות וסלטים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="burger" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'burger')}/>
                                </div>
                            </div>
                            <p className="form-control">המבורגר וקציצות</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="pasta" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'pasta')}/>
                                </div>
                            </div>
                            <p className="form-control">נודלס ופסטות</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="soup" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'soup')}/>
                                </div>
                            </div>
                            <p className="form-control">מרקים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="bakery" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'bakery')}/>
                                </div>
                            </div>
                            <p className="form-control">לחם ומאפים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="dessert" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'dessert')}/>
                                </div>
                            </div>
                            <p className="form-control">קינוחים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="breakfast" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'breakfast')}/>
                                </div>
                            </div>
                            <p className="form-control">ארוחות בוקר</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="dinner" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'dinner')}/>
                                </div>
                            </div>
                            <p className="form-control">מנות עיקריות</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="gluten" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'gluten')}/>
                                </div>
                            </div>
                            <p className="form-control">ללא גלוטן</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="snack" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'snack')}/>
                                </div>
                            </div>
                            <p className="form-control">חטיפים ונשנושים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="smoothie" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'smoothie')}/>
                                </div>
                            </div>
                            <p className="form-control">סמוזי ושייקים</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="rise" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'rise')}/>
                                </div>
                            </div>
                            <p className="form-control">תבשילים ואורז</p>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input name="cheese" onChange={handleCheck} type="checkbox" checked={categories.find((c) => c === 'cheese')}/>
                                </div>
                            </div>
                            <p className="form-control">גבינות</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mb-5">
                    <div className="container">
                        <div className="card mb-3">
                            <img src={imgUrl} className="card-img-top" id="newImgRecipe" alt="recipe"/>
                            <div className="card-body">
                                <p className="card-text text-center font-weight-bolder">{recipeName}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleDeleteRecipe} className="btn btn-danger btn-block my-5" disabled={loading}>
                        {!loading && <span>מחק מתכון</span>}
                        {loading && <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                    </button>
                </div>

                <div className="preview mb-5 container">
                    <h2 className="mb-5">תצוגה מקדימה</h2>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <h2 className="font-weight-bolder">{recipeName}</h2>
                            <p>{introduction}</p>
                            <h4 className="font-weight-bolder">מרכיבים</h4>

                            {ingredients['1'].title &&  <p className="mb-2 mt-3 font-weight-bolder">{ingredients['1'].title}</p>}
                            <ul className="list-group list-group-flush border-none">
                                {ingredients['1'].title && ingredients['1'].items.map((item, i) => {
                                    return(
                                        <li key={i} className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : i === ingredients['1'].items.length-1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}><i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                    )
                                })}
                            </ul>

                            {ingredients['2'].title &&  <p className="mb-2 mt-3 font-weight-bolder">{ingredients['2'].title}</p>}
                            <ul className="list-group list-group-flush border-none">
                                {ingredients['2'].title && ingredients['2'].items.map((item, i) => {
                                    return(
                                        <li key={i} className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : i === ingredients['2'].items.length-1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}><i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                    )
                                })}
                            </ul>

                            {ingredients['3'].title &&  <p className="mb-2 mt-3 font-weight-bolder">{ingredients['3'].title}</p>}
                            <ul className="list-group list-group-flush border-none">
                                {ingredients['3'].title && ingredients['3'].items.map((item, i) => {
                                    return(
                                        <li key={i} className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : i === ingredients['3'].items.length-1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}><i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                    )
                                })}
                            </ul>

                            {ingredients['4'].title &&  <p className="mb-2 mt-3 font-weight-bolder">{ingredients['4'].title}</p>}
                            <ul className="list-group list-group-flush border-none">
                                {ingredients['4'].title && ingredients['2'].items.map((item, i) => {
                                    return(
                                        <li key={i} className={`list-group-item bg-light ${i === 0 ? 'border-top-0' : i === ingredients['4'].items.length-1 ? 'border-bottom-0' : ''} py-1 d-flex align-items-center`}><i
                                            className="fas fa-circle mr-2"/><span>{item}</span></li>
                                    )
                                })}
                            </ul>



                            <button className="btn btn-success btn-block mt-3"><span>רכישת מוצרים עבור מתכון זה</span><i
                                className="fas fa-arrow-left ml-2"/></button>

                            <h4 className="font-weight-bolder mt-4">הוראות הכנה</h4>
                            <ul className="list-group list-group-flush border-none">
                                {instructions.map((item, i) => {
                                    return(
                                        <li key={i} className="bg-light py-1 d-flex align-items-start"><span
                                            className="mr-2 font-weight-bolder">{i+1}.</span><span>{item}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="col-lg-6 cart-items">
                            {insta && <InstagramEmbed
                                url={insta}
                                // maxWidth={320}
                                hideCaption={true}
                                containerTagName='div'
                                protocol=''
                                injectScript
                            />}

                            <button className="btn btn-success btn-block mt-5"><span>רכישת מוצרים עבור מתכון זה</span><i
                                className="fas fa-arrow-left ml-2"/></button>
                        </div>

                    </div>

                    <button onClick={handleSave} className="btn btn-success btn-block my-5" disabled={loading}>
                        {!loading && <span>שמור</span>}
                        {loading && <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                    </button>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;
    return {
        recipe
    };
};


export default compose(
    withRouter,
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes'}
    ])
)(EditFinal);
