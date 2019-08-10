import React, {useEffect, useState} from 'react';
import './navbar.scss';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {getCartItemsAndSum} from "../../store/actions/shopActions";

const Navbar = ({itemCategory, setItemCategory, setItemSearchField, profile, auth, location, shop, setCategory, category, history, setSearchField, getCart}) => {
    const [pathName, setPathName] = useState('/');

    useEffect(() => {
        getCart();
    }, [getCart]);

    useEffect(() => {
       setPathName(location.pathname);
    }, [location]);

    const handleSelectRecipeCategory = (category) => {
        setCategory(category);
        history.push('/recipes');
    };

    const handleSelectItemCategory = (category) => {
        setItemCategory(category);
        history.push('/shop');
    };

    const handleHomeClick = () => {
        setSearchField('');
        setItemSearchField('');
        setCategory('all');
        setItemCategory('all');
    };

    return (
        <nav id="mainNav" className="navbar fixed-top shadow-sm navbar-expand-lg navbar-light bg-light border py-2">
            <NavLink onClick={handleHomeClick} to="/" className="navbar-brand"><span className="text-success">הולי<i
                className="fas fa-carrot mx-0"/>ויגן</span></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item d-none d-lg-flex">
                        <NavLink onClick={handleHomeClick} to="/recipes" className={`nav-link beActive ${pathName === '/recipes' ? 'text-success' : 'text-dark'}`}>מתכונים</NavLink>
                    </li>
                    <li className="nav-item dropdown d-lg-none">
                        <span className={`nav-link dropdown-toggle ${pathName === '/recipes' ? 'text-success' : 'text-dark'}`} id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            מתכונים
                        </span>
                        <div className="dropdown-menu py-0 my-0" aria-labelledby="navbarDropdown">
                            <div onClick={() => handleSelectRecipeCategory('all')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`pb-1 pt-1 border-bottom dropdown-item ${category === 'all' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>כל המתכונים</div>
                            <div onClick={() => handleSelectRecipeCategory('burger')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'burger' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>המבורגר וקציצות</div>
                            <div onClick={() => handleSelectRecipeCategory('salad')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'salad' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>ירקות וסלטים</div>
                            <div onClick={() => handleSelectRecipeCategory('pasta')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'pasta' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>נודלס ופסטות</div>
                            <div onClick={() => handleSelectRecipeCategory('bakery')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'bakery' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>לחם ומאפים</div>
                            <div onClick={() => handleSelectRecipeCategory('soup')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'soup' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>מרקים</div>
                            <div onClick={() => handleSelectRecipeCategory('dessert')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'dessert' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>קינוחים</div>
                            <div onClick={() => handleSelectRecipeCategory('breakfast')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'breakfast' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>ארוחות בוקר</div>
                            <div onClick={() => handleSelectRecipeCategory('dinner')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'dinner' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>מנות עיקריות</div>
                            <div onClick={() => handleSelectRecipeCategory('gluten')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'gluten' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>ללא גלוטן</div>
                            <div onClick={() => handleSelectRecipeCategory('snack')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'snack' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>חטיפים ונשנושים</div>
                            <div onClick={() => handleSelectRecipeCategory('smoothie')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'smoothie' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>סמוזי ושייקים</div>
                            <div onClick={() => handleSelectRecipeCategory('rise')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'rise' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>תבשילים ואורז</div>
                            <div onClick={() => handleSelectRecipeCategory('cheese')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`pt-1 pb-1 dropdown-item ${category === 'cheese' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>גבינות</div>
                        </div>
                    </li>
                    {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && <li className="nav-item d-none d-lg-flex">
                        <NavLink onClick={handleHomeClick} to="/shop" className={`nav-link beActive ${pathName === '/shop' ? 'text-success' : 'text-dark'}`}>חנות</NavLink>
                    </li>}
                    {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && <li className="nav-item dropdown d-lg-none">
                        <span className={`nav-link dropdown-toggle ${pathName === '/shop' ? 'text-success' : 'text-dark'}`} id="navbarDropdown" role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            חנות
                        </span>
                        <div className="dropdown-menu py-0 my-0" aria-labelledby="navbarDropdown">
                            <div onClick={() => handleSelectItemCategory('all')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`pb-1 pt-1 border-bottom dropdown-item ${itemCategory === 'all' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>כל המוצרים</div>
                            <div onClick={() => handleSelectItemCategory('vege')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'vege' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>ירקות</div>
                            <div onClick={() => handleSelectItemCategory('fruits')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'fruits' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>פירות</div>
                            <div onClick={() => handleSelectItemCategory('legumes')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'legumes' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>קטניות</div>
                            <div onClick={() => handleSelectItemCategory('spices')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'spices' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>תבלינים</div>
                            <div onClick={() => handleSelectItemCategory('grain')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'grain' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>קמחים ודגנים</div>
                            <div onClick={() => handleSelectItemCategory('oil')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'oil' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>שמנים ורטבים</div>
                            <div onClick={() => handleSelectItemCategory('canned')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'canned' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>שימורים וממרחים</div>
                            <div onClick={() => handleSelectItemCategory('granola')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'granola' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>גרנולה וקונפיטורות</div>
                            <div onClick={() => handleSelectItemCategory('nuts')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'nuts' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>אגוזים ופיצוחים</div>
                            <div onClick={() => handleSelectItemCategory('milk')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'milk' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>תחליפי חלב וגבינות</div>
                            <div onClick={() => handleSelectItemCategory('east')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'east' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>מהמזרח</div>
                            <div onClick={() => handleSelectItemCategory('organic')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'organic' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>אורגני ובריאות</div>
                            <div onClick={() => handleSelectItemCategory('frozen')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${itemCategory === 'frozen' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>קפואים</div>
                            <div onClick={() => handleSelectItemCategory('sweet')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`pt-1 pb-1 dropdown-item ${itemCategory === 'sweet' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>חטיפים ומתוקים</div>
                        </div>
                    </li>}
                    {shop.canBuy && <li className="nav-item d-none d-lg-flex">
                        <NavLink onClick={handleHomeClick} to="/about" className={`nav-link beActive ${pathName === '/about' ? 'text-success' : 'text-dark'}`}>עלינו</NavLink>
                    </li>}
                    {shop.canBuy && <li className="nav-item d-lg-none" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink onClick={handleHomeClick} to="/about" className={`nav-link beActive ${pathName === '/about' ? 'text-success' : 'text-dark'}`}>עלינו</NavLink>
                    </li>}
                    <li className="nav-item d-none d-lg-flex">
                        <NavLink onClick={handleHomeClick} to="/contact" className={`nav-link beActive ${pathName === '/contact' ? 'text-success' : 'text-dark'}`}>צור קשר</NavLink>
                    </li>
                    <li className="nav-item d-lg-none" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink onClick={handleHomeClick} to="/contact" className={`nav-link beActive ${pathName === '/contact' ? 'text-success' : 'text-dark'}`}>צור קשר</NavLink>
                    </li>
                    <li className="nav-item d-none d-lg-flex">
                        <a className="nav-link text-dark" href="https://www.instagram.com/holy_vegan_il/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"/></a>
                    </li>
                    <li className="nav-item d-lg-none">
                        <a className="nav-link text-dark" href="https://www.instagram.com/holy_vegan_il/" target="_blank" rel="noopener noreferrer"><span>אינסטגרם</span><i className="fab fa-instagram mx-2"/></a>
                    </li>
                    {shop.canBuy && <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink onClick={handleHomeClick} to="/delivery" className={`nav-link beActive ${pathName === '/delivery' ? 'text-success' : 'text-dark'}`}>מדיניות משלוחים</NavLink>
                    </li>}
                </ul>

               <ul className="navbar-nav ml-auto d-none d-lg-flex">
                   {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' && <li className="nav-item">
                        <NavLink onClick={handleHomeClick} to={`${auth.uid ? '/profile' : '/login'}`} className={`nav-link px-lg-2 ${(pathName === '/register' || pathName === '/login') ? 'text-success' : 'text-dark'}`}>
                            {!auth.uid && <span>התחבר</span>}
                            {auth.uid && <span className="text-success mx-1">{profile.userName}</span>}
                            <i className="fas fa-user mx-1"/>
                        </NavLink>
                    </li>}
                   {auth.uid === '031mY4FYP9gIo8UVjsiUkQXTO6H2' &&  <li className="nav-item">
                        <NavLink onClick={handleHomeClick} to="/cart" className="nav-link px-lg-2 border-left text-dark">
                            <i className="fas fa-shopping-cart mx-1"/>
                            <span className="mx-1 text-success">{shop.cartSum ? shop.cartSum.toFixed(2) : Number(0).toFixed(2)}</span>
                            <i className="fas fa-shekel-sign mx-1"/>
                        </NavLink>
                    </li>}
                </ul>

            </div>
        </nav>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: () => dispatch(getCartItemsAndSum()),
    };
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        shop: state.shop
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
