import {combineReducers} from 'redux';
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";
import authReducer from './authReducer';
import shopReducer from './shopReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});


export default rootReducer;