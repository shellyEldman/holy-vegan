import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import './auth.scss';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {signUp} from '../../store/actions/authActions';

const Register = ({userNames, signUp, loading, authError, auth}) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [existUsers, setExistUsers] = useState([]);

    const [userNameExist, setUserNameExist] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [userNameLengthError, setUserNameLengthError] = useState(false);

    useEffect(() => {
        if (userNames && userNames[0].names) {
            setExistUsers([...userNames[0].names]);
        }
    }, [userNames]);

    const handleUserName = (e) => {
        const name = e.target.value;
        setUserName(name);
        if (existUsers.includes(name)) {
            setUserNameExist(true);
        } else {
            setUserNameExist(false);
        }
        if (userNameLengthError) {
            setUserNameLengthError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userNameExist && checkValidUserName() && checkValidEmail() && checkPasswordValid()) {
            const newUser = {
              userName,
              email,
              password
            };
            signUp(newUser);
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

    const checkValidUserName = () => {
        if (userName.length < 2 || userName.length > 12) {
            setUserNameLengthError(true);
            return false;
        } else {
            setUserNameLengthError(false);
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
                <div className="form-group">
                    <label htmlFor="username">שם משתמש</label>
                    <input type="text" className={`form-control ${userNameExist ? 'border-danger' : ''}`} id="username"
                           placeholder="הקלד שם משתמש" value={userName} onChange={handleUserName}/>
                    {userNameExist && <small className="text-danger">שם משתמש קיים במערכת, אנא בחר שם אחר.</small>}
                    {userNameLengthError && <small className="text-danger">שם משתמש צריך להכיל 2-12 תוים.</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="Email1">מייל</label>
                    <input type="email" className={`form-control ${emailInvalid ? 'border-danger' : ''}`} id="Email1"
                           placeholder="הקלד כתובת מייל" value={email} onChange={handleEmail}/>
                    {emailInvalid && <small className="text-danger">המייל שהוזן אינו תקין.</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">סיסמה</label>
                    <input type="password" className={`form-control ${passwordLengthError ? 'border-danger' : ''}`} id="exampleInputPassword1" placeholder="הקלד סיסמה"
                           value={password} onChange={handlePassword}/>
                    {passwordLengthError &&
                    <small className="text-danger">הסיסמה צריכה להכיל בין 6-12 תוים.</small>}
                </div>

                <button type="submit" className="btn btn-block btn-success" disabled={loading}>
                    {!loading && <div>הרשם</div>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status"/>}
                </button>
                {authError && <small className="text-danger">auth error</small>}
            </form>

            <p className="mt-3 mb-0">יש לך כבר חשבון? <Link to="/login" className="text-success registerLink">התחבר
                כאן!</Link></p>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        userNames: state.firestore.ordered.userNames,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'userNames', doc: 'userNames'}
    ])
)(Register);
