import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import * as moment from 'moment';
import 'moment/locale/he';
import firebase from "../../config/fbConfig";

const db = firebase.firestore();
const storage = firebase.storage();

const CommentsToApprove = ({comments}) => {

    const handleSaveComment = (recipeId, commentId, comment, commentImageUrl, createdAt, imageName, userName) => {
        db.collection("recipes").doc(recipeId).get().then(function(doc) {
            if (doc.exists) {
                const newComment = {
                    comment,
                    commentImageUrl,
                    createdAt,
                    imageName,
                    userName
                };
                const newComments = [...doc.data().comments, newComment];
                const editRecipe = {...doc.data(), comments: newComments};
                db.collection("recipes").doc(recipeId).set({...editRecipe})
                    .then(function() {
                        console.log("Document successfully updated!");
                        db.collection("comments").doc(commentId).delete().then(function() {
                            console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };

    const handleDeleteComment = (commentId, commentImageName, recipeId) => {
        if (commentImageName) {
            storage.ref("comments").child(`${recipeId}/${commentImageName}`).delete().then(function() {
                // File deleted successfully
                console.log('image successfully deleted!')
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log('error deleting image', error);
            });
        }

        db.collection("comments").doc(commentId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    return (
        <div className="commentsToApprove">
            {comments && <h5>תגובות ממתינות לאישור ({comments.length}):</h5>}
            {comments && comments.map(comment => {
                return (
                    <div key={comment.id} className="border p-3 my-3">
                        <div className="row">
                            <div className="col-lg-6">
                                <p className="my-0">{comment.userName}</p>
                                <small>{moment(comment.createdAt.toDate()).fromNow()}</small>
                                <p className="my-0">{comment.comment}</p>
                                {comment.commentImageUrl && <img src={comment.commentImageUrl} className="card-img-top" alt="recipe"/>}
                            </div>

                            <div className="col-lg-6">
                                <div className="card mb-3">
                                    <p>עבור המתכון:</p>
                                    <img src={comment.recipe.image} className="card-img-top" alt="recipe"/>
                                    <div className="card-body">
                                        <p className="card-text text-center font-weight-bolder">{comment.recipe.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleSaveComment(comment.recipe.id, comment.id, comment.comment, comment.commentImageUrl, comment.createdAt, comment.imageName, comment.userName)} className="btn btn-success mt-3 px-3">אישור</button>
                        <button onClick={() => handleDeleteComment(comment.id, comment.imageName, comment.recipe.id)} className="btn btn-danger float-right mt-3 px-3">מחק</button>
                    </div>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        comments: state.firestore.ordered.comments
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'comments', orderBy: ['createdAt', 'desc']}
    ])
)(CommentsToApprove);
