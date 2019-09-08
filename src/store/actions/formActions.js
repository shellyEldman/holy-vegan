export const sendForm = (auth,data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const db = firestore.collection('users')
        db.doc(auth.uid).update({
            "cook.details":data
        }).then(()=> console.log('document updated'))
            .catch(err=>console.log(err))
    }};





//         ).then((res) => {
//             return firestore.collection('users').doc(res.user.uid).set({
//                 userName: newUser.userName,
//                 email: newUser.email
//             });
//         }).catch((err) => {
//             dispatch({type: 'SIGNUP_ERROR', err});
//             dispatch({type: 'STOP_LOADING'});
//         });
//     };
// };