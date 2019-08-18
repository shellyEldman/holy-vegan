import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './auth.scss';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signIn} from "../../store/actions/authActions";
import firebase from "../../config/fbConfig";
import {Button, Modal} from "react-bootstrap";

const Login = ({auth, signIn, loading, error}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [show, setShow] =useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            email, password
        };
        signIn(credentials);
    };

    const handleClose = () => {
      setShow(false);
    };

    useEffect(() => {
        if (error) {
            console.log('error', error);
            setInvalid(true);
            if (error === 'auth/user-not-found') {
                setErrMessage('מייל לא קיים במערכת');
            }
            if (error === 'auth/wrong-password') {
                setErrMessage('סיסמה לא נכונה')
            }
        }
    }, [error]);

    const resetPassword = () => {
        setShow(true);
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            console.log('email sent');
        }).catch(function(error) {
            console.log('error sending email', error);
        });
    };

    if (auth.uid) {
        return <Redirect to="/"/>
    }
    return(
        <div className="login d-flex flex-column align-items-center" style={{'marginTop': '68px'}}>
            <h3 className="text-success mt-3">טופס התחברות</h3>
            <form onSubmit={handleSubmit} className="mt-3 border rounded shadow px-3 py-3">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">מייל</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="הקלד כתובת מייל"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">סיסמה</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="הקלד סיסמה"/>
                    {invalid && <small className="text-danger">{errMessage}</small>}
                    {errMessage === 'סיסמה לא נכונה' && <div><small>שכחת סיסמה? <span onClick={resetPassword} className="text-success reset-password">לחץ כאן!</span></small></div>}
                </div>
                <button type="submit" className="btn btn-block btn-success" disabled={loading}>
                    {!loading && <div>התחבר</div>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status"/>}
                </button>
            </form>

            <p className="mt-3 mb-0">אין לך עדיין חשבון? <Link className="text-success registerLink" to="/register">הרשם כאן!</Link></p>

            <Modal dir="rtl" show={show} onHide={handleClose}>
                <Modal.Body dir="rtl">
                    <React.Fragment>
                        <h4>איפוס סיסמה</h4>
                        <p className="mb-0"> מייל לאיפוס סיסמה נשלח לכתובת<span className="mx-1">{email}</span></p>
                    </React.Fragment>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        סגור
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        error: state.auth.authError,
        loading: state.auth.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);