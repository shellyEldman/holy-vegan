import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './auth.scss';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signIn} from "../../store/actions/authActions";

const Login = ({auth, signIn, loading}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        const credentials = {
            email, password
        };
        signIn(credentials);
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
                </div>
                <button type="submit" className="btn btn-block btn-success" disabled={loading}>
                    {!loading && <div>התחבר</div>}
                    {loading && <div className="spinner-border spinner-border-sm" role="status"/>}
                </button>
            </form>

            <p className="mt-3 mb-0">אין לך עדיין חשבון? <Link className="text-success registerLink" to="/register">הרשם כאן!</Link></p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loading: state.auth.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);