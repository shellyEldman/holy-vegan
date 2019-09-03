import React, {useState, useEffect} from 'react';
import './profile.scss';
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";
import {Redirect} from 'react-router-dom';
import AddItems from './addItems';
import AddRecipe from './addRecipe';
import EditRecipe from './editRecipe/editRecipe';
import CommentsToApprove from './commentsToApprove';
import RecipesIngredients from './addRecipeIngredients/recipesIngredients';
import EditItem from './editItem/editItem';
import Favor from './favor';
import UserProfile from './userProfile';
import JoinAsCooker from "../JoinAsCooker";
import BusinessDetails from "./cookProfile/BusinessDetails";

const Profile = ({auth, profile, signOut, history}) => {
    const [category, setCategory] = useState('cooker');
    const [categoryName, setCategoryName] = useState('פרופיל משתמש');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        switch (category.toString()) {
            case 'user':
                setCategoryName('פרופיל משתמש');
                break;
            case 'add':
                setCategoryName('הוספת מוצרים');
                break;
            case 'editItem':
                setCategoryName('עריכת מוצר');
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
            case 'recipesIngredients':
                setCategoryName('מוצרים למתכונים');
                break;
            case 'history':
                setCategoryName('היסטוריית קניות');
                break;
            case 'favor':
                setCategoryName('מתכונים מועדפים');
                break;
            case 'businessDetails':
                setCategoryName('פרטי עסק');
                break;
            case 'ordersToMake':
                setCategoryName('הזמנות');
                break;
            case 'businessPage':
                setCategoryName('דף עסק');
                break;
            case 'myRecipes':
                setCategoryName('המתכונים שלי');
                break;
            case 'cooker':
                setCategoryName('הצטרפות כבשלן');
            default:
                setCategoryName('פרופיל משתמש');
        }
    }, [category]);

    const handleSignOut = () => {
        signOut();
        history.push('/');
    };

    const handleSelectCategory = (category) => {
        setCategory(category);
    };


    if (!auth.uid) {
        return <Redirect to="/"/>
    }

    const cookMenu = () => {
        if (profile.isLoaded) {
            if (profile.cook.isCook) {
                return (
                    <div>
                        <div
                            onClick={() => setCategory('businessDetails')}
                            className={`${category === 'businessDetails' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>פרטי
                            עסק
                        </div>
                        <div
                            onClick={() => setCategory('businessPage')}
                            className={`${category === 'businessPage' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>דף
                            עסק
                        </div>
                        <div
                            onClick={() => setCategory('myRecipes')}
                            className={`${category === 'myRecipes' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>המתכונים
                            שלי
                        </div>
                        <div
                            onClick={() => setCategory('ordersToMake')}
                            className={`${category === 'ordersToMake' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>הזמנות
                        </div>
                    </div>
                );
            }
        }

        return null;
    }

    return (
        <div className="profile row mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <div className="col-lg-2 bg-light position-fixed choose-profile-items d-none d-lg-inline border-right shadow-sm m-0 p-0">
                <div className="categories-lg mt-3 bg-light">
                    <div onClick={() => setCategory('favor')}
                         className={`${category === 'favor' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>מתכונים מועדפים
                    </div>
                    <div onClick={() => setCategory('user')}
                         className={`${category === 'user' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>פרופיל
                        משתמש
                    </div>
                    <div onClick={() => setCategory('cooker')}
                         className={`${category === 'cooker' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>הצטרפות כבשלן
                    </div>

                    {/* menu options for cook profile*/}
                    {cookMenu()}

                    {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && <div>
                        <div onClick={() => setCategory('history')}
                             className={`${category === 'history' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>היסטוריית
                            קניות
                        </div>
                        <div onClick={() => setCategory('add')}
                             className={`${category === 'add' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>הוספת
                            מוצרים
                        </div>
                        <div onClick={() => setCategory('editItem')}
                             className={`${category === 'editItem' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>עריכת
                            מוצר
                        </div>
                        <div onClick={() => setCategory('addRecipe')}
                             className={`${category === 'addRecipe' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>הוספת
                            מתכון
                        </div>
                        <div onClick={() => setCategory('editRecipe')}
                             className={`${category === 'editRecipe' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>ערוך
                            מתכון
                        </div>
                        <div onClick={() => setCategory('recipesIngredients')}
                             className={`${category === 'recipesIngredients' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>מוצרים
                            למתכונים
                        </div>
                        <div onClick={() => setCategory('comments')}
                             className={`${category === 'comments' ? 'bg-success text-light' : ''} px-2 py-1 mr-1 category-item`}>תגובות
                            לאישור
                        </div>
                    </div>}

                </div>
            </div>


            <div className="col-lg-10 user-profile mt-3 bg-light">
                <div className="container">
                    <h3 onClick={() => setOpen(!open)} className="text-center text-dark d-lg-none"
                        style={{'cursor': 'pointer'}} data-toggle="collapse" data-target="#collapseOne">
                        <span>{categoryName}</span><i
                        className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}/></h3>
                    <ul onClick={() => setOpen(!open)} id="collapseOne"
                        className="list-group text-dark collapse mb-3 d-lg-none">
                        <div onClick={() => handleSelectCategory('favor')} data-toggle="collapse"
                             data-target="#collapseOne"
                             className={`py-1 border-bottom list-group-item ${category === 'favor' ? 'text-light bg-success' : ''}`}
                             style={{'cursor': 'pointer'}}>מתכונים מועדפים
                        </div>
                        <div onClick={() => handleSelectCategory('user')} data-toggle="collapse"
                             data-target="#collapseOne"
                             className={`pb-1 pt-1 border-bottom list-group-item ${category === 'user' ? 'text-light bg-success' : ''}`}
                             style={{'cursor': 'pointer'}}>פרופיל משתמש
                        </div>
                    </ul>

                    <div className="mt-3 mt-lg-0 bg-light">
                        {category === 'favor' && <Favor/>}
                        {category === 'cooker' && <JoinAsCooker profile={profile} auth={auth}/>}
                        {category === 'user' && <UserProfile profile={profile} handleSignOut={handleSignOut}/>}
                        {category === 'businessDetails' && <BusinessDetails />}
                        {category === 'ordersToMake' && <UserProfile />}
                        {category === 'businessPage' && <UserProfile />}
                        {category === 'myRecipes' && <UserProfile />}

                        {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && <div>
                            {category === 'add' && <AddItems/>}
                            {category === 'addRecipe' && <AddRecipe/>}
                            {category === 'editRecipe' && <EditRecipe/>}
                            {category === 'comments' && <CommentsToApprove/>}
                            {category === 'recipesIngredients' && <RecipesIngredients/>}
                            {category === 'editItem' && <EditItem/>}
                        </div>}
                    </div>
                </div>
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
