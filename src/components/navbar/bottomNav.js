import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";

const BottomNav = ({profile, auth, history, match}) => {
    const [pathName, setPathName] = useState('');

    useEffect(() => {
        if (history) {
            setPathName(history.location.pathname);
        }
    }, [history, match]);

    if (pathName === '/login' || pathName === '/register' || pathName === '/profile') {
        return null;
    }

    return (
        <ul className="nav fixed-bottom bottomNav d-lg-none border d-flex bg-white py-1">
            <li className="nav-item flex-fill text-center">
                <NavLink to={`${auth.uid ? '/profile' : '/login'}`} className="nav-link px-lg-2 text-dark">
                    <i className="fas fa-user mx-1"/><span className="mx-1">
                            {!auth.uid && <span>התחבר</span>}
                    {auth.uid && <span className="text-success mx-1">{profile.userName}</span>}
                        </span>
                </NavLink>
            </li>
            {/*<li className="nav-item flex-fill border-left text-center">*/}
            {/*    <NavLink to="/cart" className="nav-link px-lg-2 text-dark">*/}
            {/*        <i className="fas fa-shopping-cart mx-1"/>*/}
            {/*        <span className="mx-1">347.40</span>*/}
            {/*        <i className="fas fa-shekel-sign mx-1"/>*/}
            {/*    </NavLink>*/}
            {/*</li>*/}
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    withRouter
)(BottomNav);
