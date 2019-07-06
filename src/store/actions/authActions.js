export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'START_LOADING'});
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
            dispatch({type: 'STOP_LOADING'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
            dispatch({type: 'STOP_LOADING'});
        });
    };
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    };
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: 'START_LOADING'});
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                userName: newUser.userName,
                email: newUser.email
            });
        }).then(() => {
            firestore.collection('userNames').doc('userNames').get().then(doc => {
                const data = doc.data();
                const names = data.names;
                firestore.collection('userNames').doc('userNames').set({
                    names: [...names, newUser.userName]
                }).then(() => {
                    dispatch({type: 'SIGNUP_SUCCESS'});
                    dispatch({type: 'STOP_LOADING'});
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERROR', err});
            dispatch({type: 'STOP_LOADING'});
        });
    };
};