import React, {useEffect, useState} from 'react';
import './navbar.scss';
import {NavLink, Link} from "react-router-dom";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";

const Navbar = ({profile, auth, location, shop, setCategory, category, history}) => {
    const [pathName, setPathName] = useState('/');

    useEffect(() => {
       setPathName(location.pathname);
    }, [location]);

    const handleSelectRecipeCategory = (category) => {
        setCategory(category);
        history.push('/recipes');
    };

    return (
        <nav id="mainNav" className="navbar fixed-top shadow-sm navbar-expand-lg navbar-light bg-light border py-2">
            <NavLink to="/" className="navbar-brand"><span className="text-success mx-1">הולי-ויגן</span><i
                className="fas fa-carrot"/></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item d-none d-lg-flex">
                        <Link to="/recipes" className={`nav-link ${pathName === '/recipes' ? 'text-success' : 'text-dark'}`}>מתכונים</Link>
                    </li>
                    <li className="nav-item dropdown d-lg-none">
                        <span className={`nav-link dropdown-toggle ${pathName === '/recipes' ? 'text-success' : 'text-dark'}`} id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            מתכונים
                        </span>
                        <div className="dropdown-menu py-0 my-0" aria-labelledby="navbarDropdown">
                            <div onClick={() => handleSelectRecipeCategory('all')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`pb-1 pt-1 border-bottom dropdown-item ${category === 'all' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>כל המתכונים</div>
                            <div onClick={() => handleSelectRecipeCategory('salad')} data-toggle="collapse" data-target="#navbarSupportedContent" className={`py-1 border-bottom dropdown-item ${category === 'salad' ? 'text-success' : ''}`} style={{'cursor': 'pointer'}}>סלטים</div>
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
                    {shop.canBuy && <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/shop" className={`nav-link ${pathName === '/shop' ? 'text-success' : 'text-dark'}`}>חנות</NavLink>
                    </li>}
                    {shop.canBuy && <li className="nav-item d-none d-lg-flex">
                        <NavLink to="/about" className={`nav-link ${pathName === '/about' ? 'text-success' : 'text-dark'}`}>עלינו</NavLink>
                    </li>}
                    {shop.canBuy && <li className="nav-item d-lg-none" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/about" className={`nav-link ${pathName === '/about' ? 'text-success' : 'text-dark'}`}>עלינו</NavLink>
                    </li>}
                    <li className="nav-item d-none d-lg-flex">
                        <NavLink to="/contact" className={`nav-link ${pathName === '/contact' ? 'text-success' : 'text-dark'}`}>צור קשר</NavLink>
                    </li>
                    <li className="nav-item d-lg-none" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/contact" className={`nav-link ${pathName === '/contact' ? 'text-success' : 'text-dark'}`}>צור קשר</NavLink>
                    </li>
                    {shop.canBuy && <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/delivery" className={`nav-link ${pathName === '/delivery' ? 'text-success' : 'text-dark'}`}>מדיניות משלוחים</NavLink>
                    </li>}
                </ul>

                {shop.canBuy && <ul className="navbar-nav ml-auto d-none d-lg-flex">
                    <li className="nav-item">
                        <NavLink to={`${auth.uid ? '/profile' : '/login'}`} className={`nav-link px-lg-2 ${(pathName === '/register' || pathName === '/login') ? 'text-success' : 'text-dark'}`}>
                            <i className="fas fa-user mx-1"/><span className="mx-1">
                            {!auth.uid && <span>התחבר</span>}
                            {auth.uid && <span className="font-italic text-success">{profile.userName}</span>}
                        </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cart" className="nav-link px-lg-2 border-left text-dark">
                            <i className="fas fa-shopping-cart mx-1"/>
                            <span className="mx-1">347.40</span>
                            <i className="fas fa-shekel-sign mx-1"/>
                        </NavLink>
                    </li>
                </ul>}

            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        shop: state.shop
    }
};

export default withRouter(connect(mapStateToProps)(Navbar));
