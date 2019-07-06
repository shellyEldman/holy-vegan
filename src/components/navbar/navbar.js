import React, {useEffect, useState} from 'react';
import './navbar.scss';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";

const Navbar = ({profile, auth, location, canBuy}) => {
    const [pathName, setPathName] = useState('/');
    useEffect(() => {
       setPathName(location.pathname);
    }, [location]);

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
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/" className={`nav-link ${pathName === '/' ? 'text-success' : 'text-dark'}`}>מתכונים</NavLink>
                    </li>
                    {canBuy && <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/shop" className={`nav-link ${pathName === '/shop' ? 'text-success' : 'text-dark'}`}>חנות</NavLink>
                    </li>}
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/about" className={`nav-link ${pathName === '/about' ? 'text-success' : 'text-dark'}`}>עלינו</NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/contact" className={`nav-link ${pathName === '/contact' ? 'text-success' : 'text-dark'}`}>צור קשר</NavLink>
                    </li>
                    {canBuy && <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <NavLink to="/delivery" className={`nav-link ${pathName === '/delivery' ? 'text-success' : 'text-dark'}`}>מדיניות משלוחים</NavLink>
                    </li>}
                </ul>

                {canBuy && <ul className="navbar-nav ml-auto d-none d-lg-flex">
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
        canBuy: state.canBuy
    }
};

export default withRouter(connect(mapStateToProps)(Navbar));
