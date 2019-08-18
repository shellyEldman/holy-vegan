import React, {useState} from 'react';
import "./contact.scss";
import firebase from "../../config/fbConfig";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
const db = firebase.firestore();

const Contact = ({profile, auth}) => {
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);

    const handleChange = (type, value) => {
        switch (type) {
            case 'name':
                setName(value);
                break;
            case 'topic':
                setTopic(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'mail':
                setMail(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                console.log('error, no such type', type);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        db.collection("contact-messages").add({
            name,
            topic,
            phone,
            mail,
            message
        })
            .then(function () {
                console.log("Document successfully written!");
                setLoading(false);
                setCommentAdded(true);
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                setLoading(false);
            });
    };

    return (
        <div className="contact mx-0 p-0 bg-light" style={{'marginTop': '68px'}}>
            <Helmet>
                <title>הולי ויגן | יצירת קשר</title>
                <meta name="description" content="צור קשר עם הולי-ויגן" />
            </Helmet>
            <div className="container mt-3 text-dark">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>יצירת קשר</h1>
                        <p className="mt-3 font-weight-bolder">פרטים ליצירת קשר:</p>

                        <div className="my-3 d-flex align-items-center">
                            <i className="fas fa-map-marker-alt mr-2"/><span>תל-אביב</span>
                        </div>

                        <div className="my-3 d-flex align-items-center">
                            <i className="fas fa-phone mr-2"/><span>0544496362 (שלי)</span>
                        </div>

                        <div className="my-3 d-flex align-items-center">
                            <i className="fas fa-envelope mr-2"/><span>shelyeldman@gmail.com</span>
                        </div>

                    </div>

                    <div className="col-lg-6">
                        {!commentAdded && <form onSubmit={handleSubmit} className="my-3">
                            <div className="form-group">
                                <label htmlFor="contactName">שם</label>
                                <input value={name} maxLength="27" onChange={(e) => handleChange('name', e.target.value)} type="text" className="form-control form-control-sm" id="contactName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactTopic">נושא</label>
                                <input value={topic} maxLength="47" onChange={(e) => handleChange('topic', e.target.value)} type="text" className="form-control form-control-sm" id="contactTopic"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactPhone">טלפון</label>
                                <input value={phone} maxLength="27" onChange={(e) => handleChange('phone', e.target.value)} type="text" className="form-control form-control-sm" id="contactPhone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactEmail">מייל</label>
                                <input value={mail} maxLength="27" onChange={(e) => handleChange('mail', e.target.value)} type="email" className="form-control form-control-sm" id="contactEmail"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactMessage"><span>הודעה</span><span className="mx-2                                                     hhh">{message.length}/250</span></label>
                                <textarea value={message} maxLength="250" onChange={(e) => handleChange('message', e.target.value)} className="form-control form-control-sm" id="contactMessage" rows="3"/>
                            </div>
                            <button onClick={handleSubmit} className="btn btn-sm btn-success btn-block mb-3"
                                    disabled={loading}>
                                {!loading && <span>שליחה</span>}
                                {loading && <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>}
                            </button>
                        </form>}

                        {commentAdded && <div className="mt-5 border shadow-sm rounded py-3 px-5">
                            <p className="text-center">הודעתך התקבלה בהצלחה</p>
                            <h5 className="text-success text-center">תודה!</h5>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default connect(mapStateToProps)(Contact);