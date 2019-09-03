import React from 'react';

const JoinAsCooker = ({profile}) => {
    return (
        <div className="row">
            <div className="col-12 p-lg-5">
                <form>
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
                    </div>
                    </div>
                </form>
                <button className="btn btn-danger btn-block">התנתק</button>

            </div>
        </div>
    );
};

export default JoinAsCooker;