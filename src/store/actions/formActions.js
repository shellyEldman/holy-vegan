export const send = (user,data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').add({
        data
        }).then(res => console.log(res))}






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