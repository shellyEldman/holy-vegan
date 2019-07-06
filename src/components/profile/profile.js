import React, {useState, useEffect} from 'react';
import './profile.scss';
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";
import {Redirect} from 'react-router-dom';
import AddItems from './addItems';
import AddRecipe from './addRecipe';
import EditRecipe from './editRecipe/editRecipe';
import CommentsToApprove from './commentsToApprove';

const Profile = ({auth, profile, signOut, history}) => {
    const [category, setCategory] = useState('user');
    const [categoryName, setCategoryName] = useState('פרופיל משתמש');

    useEffect(() => {
        switch (category.toString()) {
            case 'user':
                setCategoryName('פרופיל משתמש');
                break;
            case 'add':
                setCategoryName('הוספת מוצרים');
                break;
            case 'addRecipe':
                setCategoryName('הוספת מתכון');
                break;
            case 'editRecipe':
                setCategoryName('ערוך מתכון');
                break;
            case 'comments':
                setCategoryName('תגובות לאישור');
                break;
            case 'history':
                setCategoryName('היסטוריית קניות');
                break;
            default:
                setCategoryName('פרופיל משתמש');
        }
    }, [category]);

    const handleSignOut = () => {
        signOut();
        history.push('/');
    };

    if (!auth.uid) {
        return <Redirect to="/"/>
    }

    return (
        <div className="profile row p-0 bg-light" style={{'marginTop': '68px'}}>
            <div className="col-lg-2 choose-profile-items d-none d-lg-inline shadow-sm m-0 p-0">
                <div className="categories-lg mt-3">
                    <div onClick={() => setCategory('user')}
                         className={`${category === 'user' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>פרופיל
                        משתמש
                    </div>
                    <div onClick={() => setCategory('history')}
                         className={`${category === 'history' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>היסטוריית
                        קניות
                    </div>
                    {profile.userName === 'שלי אלדמן' && <div onClick={() => setCategory('add')}
                                                              className={`${category === 'add' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>הוספת
                        מוצרים</div>}
                    {profile.userName === 'שלי אלדמן' && <div onClick={() => setCategory('addRecipe')}
                                                              className={`${category === 'addRecipe' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>הוספת
                        מתכון</div>}
                    {profile.userName === 'שלי אלדמן' && <div onClick={() => setCategory('editRecipe')}
                                                              className={`${category === 'editRecipe' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>ערוך
                        מתכון</div>}
                    {profile.userName === 'שלי אלדמן' && <div onClick={() => setCategory('comments')}
                                                              className={`${category === 'comments' ? 'bg-success' : ''} px-2 py-1 mr-1 category-item`}>תגובות לאישור</div>}
                </div>
            </div>


            <div className="col d-lg-none shadow-sm bg-success mb-3">
                <div className="categories-sm container">
                    <div className="py-1" data-toggle="collapse" data-target="#collapseCategories">
                        <span>{categoryName}</span><i className="fas fa-chevron-down mx-2"/></div>
                    <div className="collapse choose-items-sm" id="collapseCategories">
                        <div onClick={() => setCategory('user')} data-toggle="collapse"
                             data-target="#collapseCategories"
                             className={`py-1 border-bottom ${category === 'user' ? 'text-light' : ''}`}>פרופיל משתמש
                        </div>
                        <div onClick={() => setCategory('history')} data-toggle="collapse"
                             data-target="#collapseCategories"
                             className={`py-1 border-bottom ${category === 'history' ? 'text-light' : ''}`}>היסטוריית
                            קניות
                        </div>
                        {profile.userName === 'שלי אלדמן' &&
                        <div onClick={() => setCategory('add')} data-toggle="collapse" data-target="#collapseCategories"
                             className={`py-1 border-bottom ${category === 'add' ? 'text-light' : ''}`}>הוספת
                            מוצרים</div>}
                        {profile.userName === 'שלי אלדמן' &&
                        <div onClick={() => setCategory('addRecipe')} data-toggle="collapse" data-target="#collapseCategories"
                             className={`py-1 ${category === 'addRecipe' ? 'text-light' : ''}`}>הוספת
                            מתכון</div>}
                        <div onClick={() => setCategory('editRecipe')} data-toggle="collapse" data-target="#collapseCategories"
                             className={`py-1 ${category === 'editRecipe' ? 'text-light' : ''}`}>ערוך
                            מתכון</div>}
                        <div onClick={() => setCategory('comments')} data-toggle="collapse" data-target="#collapseCategories"
                             className={`py-1 ${category === 'comments' ? 'text-light' : ''}`}>תגובות לאישור</div>}
                    </div>
                </div>
            </div>

            <div className="col-lg-10 user-profile mt-3">
                {category === 'user' && <div className="container">
                    <h5 className="mb-0">שם משתמש:</h5>
                    <p className="font-italic text-success">{profile.userName}<i className="fas fa-pencil-alt mx-2"/>
                    </p>

                    <h5 className="mb-0">טלפון:</h5>
                    <p className="font-italic text-success">{profile.phone}<i className="fas fa-pencil-alt mx-2"/></p>

                    <h5 className="mb-0">אימייל:</h5>
                    <p className="font-italic text-success">{profile.email}</p>

                    <button onClick={handleSignOut} className="btn btn-danger rounded-pill px-4 py-0">התנתק</button>
                </div>}

                {category === 'add' && profile.userName === 'שלי אלדמן' && <AddItems/>}
                {category === 'addRecipe' && profile.userName === 'שלי אלדמן' && <AddRecipe/>}
                {category === 'editRecipe' && profile.userName === 'שלי אלדמן' && <EditRecipe/>}
                {category === 'comments' && profile.userName === 'שלי אלדמן' && <CommentsToApprove/>}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
