import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import './auth.scss';
import {connect} from "react-redux";
import {signUp} from '../../store/actions/authActions';

const Register = ({signUp, loading, authError, auth}) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [userInvalid, setUserInvalid] = useState(false);

    const handleUserName = (e) => {
        setUserName(e.target.value);
        setUserInvalid(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkValidEmail() && checkPasswordValid() && checkValidUser()) {
            const newUser = {
                userName,
                email,
                password
            };
            signUp(newUser);
        }
    };

    const checkValidUser = () => {
        if (userName.length < 2) {
            setUserInvalid(true);
            return false;
        } else {
            setUserInvalid(false);
            return true;
        }
    };

    const checkValidEmail = () => {
        /*eslint-disable */
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /*eslint-enable */
        if (re.test(String(email).toLowerCase())) {
            setEmailInvalid(false);
            return true;
        } else {
            setEmailInvalid(true);
            return false;
        }
    };

    const checkPasswordValid = () => {
        if (password.length < 6 || password.length > 12) {
            setPasswordLengthError(true);
            return false;
        } else {
            setPasswordLengthError(false);
            return true;
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (passwordLengthError) {
            setPasswordLengthError(false);
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (emailInvalid) {
            setEmailInvalid(false);
        }
    };

    if (auth.uid) {
        return <Redirect to="/"/>
    }

    return (
        <div className="login d-flex flex-column align-items-center" style={{'marginTop': '68px'}}>
            <h3 className="text-success mt-3">טופס הרשמה</h3>

            <form onSubmit={handleSubmit} className="mt-3 border rounded shadow px-3 py-3">
                {/*<div className="row">*/}
                    {/*<div className="col-12 col-lg-6">*/}
                        <div className="form-group">
                            <label htmlFor="name">שם מלא</label>
                            <input type="text" maxLength="37"
                                   className={`form-control`} id="name"
                                   placeholder="הקלד את שמך המלא" value={userName} onChange={handleUserName}/>
                            {userInvalid &&
                            <small className="text-danger">שם המשתמש צריך להכיל לפחות 2 תוים.</small>}
                        </div>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="phone">טלפון נייד</label>*/}
                        {/*    <input type="text" maxLength="10"*/}
                        {/*           className={`form-control`} id="phone"*/}
                        {/*           placeholder="הקלד את מספר הטפלון" value={phone} onChange={handlePhone}/>*/}
                        {/*</div>*/}
                        <div className="form-group">
                            <label htmlFor="Email1">מייל</label>
                            <input type="email" maxLength="37"
                                   className={`form-control ${emailInvalid ? 'border-danger' : ''}`} id="Email1"
                                   placeholder="הקלד כתובת מייל" value={email} onChange={handleEmail}/>
                            {emailInvalid && <small className="text-danger">המייל שהוזן אינו תקין.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">סיסמה</label>
                            <input type="password" maxLength="12"
                                   className={`form-control ${passwordLengthError ? 'border-danger' : ''}`}
                                   id="exampleInputPassword1" placeholder="הקלד סיסמה"
                                   value={password} onChange={handlePassword}/>
                            {passwordLengthError &&
                            <small className="text-danger">הסיסמה צריכה להכיל בין 6-12 תוים.</small>}
                        </div>
                    {/*</div>*/}

                    {/*<div className="col-12 col-lg-6">*/}
                    {/*    <h5 className="">כתובת למשלוח</h5>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="city">עיר</label>*/}
                    {/*        <input type="text" maxLength="17"*/}
                    {/*               className={`form-control`} id="city"*/}
                    {/*               placeholder="הקלד את שם העיר" value={city} onChange={(e) => setCity(e.target.value)}/>*/}
                    {/*    </div>*/}

                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="street">רחוב</label>*/}
                    {/*        <input type="text" maxLength="17"*/}
                    {/*               className={`form-control`} id="street"*/}
                    {/*               placeholder="הקלד את שם הרחוב" value={street} onChange={(e) => setStreet(e.target.value)}/>*/}
                    {/*    </div>*/}

                    {/*    <div className="d-flex">*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label htmlFor="homeNum">מס' בית</label>*/}
                    {/*            <input type="text" maxLength="10" className={`form-control`}*/}
                    {/*                   id="homeNum"*/}
                    {/*                   placeholder="מס' בית" value={homeNum} onChange={(e) => setHomeNum(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group ml-2">*/}
                    {/*            <label htmlFor="apNum">מס' דירה</label>*/}
                    {/*            <input type="text" maxLength="10" className={`form-control`}*/}
                    {/*                   id="apNum"*/}
                    {/*                   placeholder="מס' דירה" value={apNum} onChange={(e) => setApNum(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group ml-2">*/}
                    {/*            <label htmlFor="entrance">כניסה</label>*/}
                    {/*            <input type="text" maxLength="10" className={`form-control`}*/}
                    {/*                   id="entrance"*/}
                    {/*                   placeholder="כניסה" value={entrance} onChange={(e) => setEntrance(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="col-12">*/}
                        <button type="submit" className="btn btn-block btn-success" disabled={loading}>
                            {!loading && <div>הרשם</div>}
                            {loading && <div className="spinner-border spinner-border-sm" role="status"/>}
                        </button>
                        {authError && <small className="text-danger">auth error</small>}
                    {/*</div>*/}
                {/*</div>*/}
            </form>

            <p className="my-3">יש לך כבר חשבון? <Link to="/login" className="text-success registerLink">התחבר
                כאן!</Link></p>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loading: state.auth.loading,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
