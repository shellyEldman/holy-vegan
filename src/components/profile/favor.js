import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Link} from "react-router-dom";
import firebase from "../../config/fbConfig";
import { withRouter } from "react-router-dom";

const dbUsers = firebase.firestore().collection('users');

const Favor = ({auth, profile, recipes, history}) => {
    const [fav, setFav] = useState([]);

    useEffect(() => {
        if (profile && profile.isLoaded) {
            if (profile.fav) {
                setFav([...profile.fav]);
            }
        }
    }, [profile]);

    const handleRemoveFav = (e, id) => {
        e.stopPropagation();
        dbUsers.doc(auth.uid).get()
            .then((doc) => {
                const fav = [...doc.data().fav];
                const filterFav = fav.filter(favId => favId !== id);
                const newData = {
                    ...doc.data(),
                    fav: filterFav
                };
                dbUsers.doc(auth.uid).set({
                    ...newData
                }).then(() => {
                    console.log('user saved!');
                }).catch((err) => {
                    console.log('error saving user..', err);
                });
            })
            .catch((err) => {
                console.log('no such user', err);
            });
    };

    return (
        <div className="row favorite-recipes">
            {fav.map(favId => {
                if (recipes && recipes[favId]) {
                    return (
                        <div key={favId} className="col-sm-6 col-md-4 col-xl-3">
                            <div className="card recipe-main-card shadow-sm mb-3 text-dark">
                                <Link to={`/recipes/${favId}`} style={{textDecoration: 'none'}}
                                      className="subnav_add">
                                    <img src={recipes[favId].imgUrl} className="card-img-top"
                                         alt={recipes[favId].recipeName}/>
                                </Link>
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder d-flex justify-content-between align-items-center">
                                        <Link to={`/recipes/${favId}`} style={{textDecoration: 'none'}}
                                              className="subnav_add"><span
                                            className="text-dark">{recipes[favId].recipeName}</span></Link>
                                        <i onClick={(e) => handleRemoveFav(e, favId)}
                                           className="fas fa-star text-success"/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                } else return null;
            })}
            {fav.length === 0 && recipes && <div>
                <p>אין לך עדיין מתכונים מועדפים <span role="img" aria-label="jsx-a11y/aria-proptypes">🙄</span></p>
                <button onClick={() => history.push('/recipes')} className="btn btn-outline-secondary">
                    <span>עבור למתכונים</span>
                    <i className="fas fa-arrow-left ml-2"/>
                </button>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        recipes: state.firestore.data.recipes
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes'}
    ]),
    withRouter
)(Favor);