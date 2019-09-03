import React, {useState} from 'react';
import {connect} from "react-redux";
import {signUp} from "../store/actions/authActions";
import {sendForm} from '../store/actions/formActions'


const JoinAsCooker = ({profile,auth}) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    {console.log(profile)}
    {console.log(auth)}

    const handleSubmit = (e)=> {
        e.preventDefault()
        const data = {
            userName,
            email
        }
    sendForm(data)
    };


    return (
        <div className="row">
            <div className="col-12 p-lg-5">
                <form onSubmit={(e)=> handleSubmit}>
                    <div className="row">
                        {/*right side*/}
                        <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="userNameProfile"><span>שם מלא</span></label>
                        <input type="text" className="form-control" id="userNameProfile"
                               placeholder={profile.userName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userNameProfile"><span>שם העסק\בשלן</span></label>
                        <input type="text" className="form-control" id="userNameProfile"
                               placeholder="הבשלנייה"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhoneCooker"><span>טלפון</span></label>
                        <input type="text" className="form-control" id="userPhoneCooker"
                               placeholder={profile.phone}/>
                    </div>
                            <div className="form-checkbox-days">
                            <legend>ימים פעילים</legend>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day1"
                               value="day1"/>
                            <label className="form-check-label" htmlFor="day1">ראשון</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day2"
                               value="day2"/>
                            <label className="form-check-label" htmlFor="day2">שני</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day3"
                               value="day3"/>
                        <label className="form-check-label" htmlFor="day3">שלישי</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day4"
                               value="day4"/>
                        <label className="form-check-label" htmlFor="day4">רביעי</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day5"
                               value="day5"/>
                        <label className="form-check-label" htmlFor="day5">חמישי</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="day6"
                               value="day6"/>
                        <label className="form-check-label" htmlFor="day6">שישי</label>
                    </div>
                                <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                    <select className="custom-select opening-hours" name="opening-hours">
                                        <option>שעת פתיחה</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                        <option value="13">13:00</option>
                                        <option value="14">14:00</option>
                                        <option value="15">15:00</option>
                                        <option value="16">16:00</option>
                                        <option value="17">17:00</option>
                                        <option value="18">18:00</option>
                                        <option value="19">19:00</option>
                                        <option value="20">20:00</option>
                                    </select>
                                    </div>
                                    <div className="col-6">
                                    <select className="custom-select closing-hours" name="closing-hours">
                                        <option>שעת סגירה</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                        <option value="13">13:00</option>
                                        <option value="14">14:00</option>
                                        <option value="15">15:00</option>
                                        <option value="16">16:00</option>
                                        <option value="17">17:00</option>
                                        <option value="18">18:00</option>
                                        <option value="19">19:00</option>
                                        <option value="20">20:00</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*left side*/}
                        <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="userMailCooker">מייל</label>
                        <input type="text" className="form-control" id="userMailCooker"
                               placeholder={profile.email} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userCityCooker">עיר</label>
                        <input type="text" className="form-control" id="userCityCooker"
                               placeholder="עיר">
                        </input>
                    </div>
                        <label>תמונה</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="cookerPicFile"></input>
                                    <label className="custom-file-label" htmlFor="cookerPicFile"
                                           aria-describedby="inputGroupFileAddon02"></label>
                            </div>
                            <div className="input-group-append">
                                <span className="input-group-text" id="cookerPicFile">העלאה</span>
                            </div>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="cookerAboutMe-textarea"> על המטבח שלי</label>
                                <textarea className="form-control" id="cookerAboutMe-textarea" rows="4"></textarea>
                            </div>
                    </div>
                    </div>
                    <button className="btn btn-success btn-block" type="submit">שלח</button>
                </form>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendForm : (auth,data)=> dispatch(sendForm(auth,data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinAsCooker);