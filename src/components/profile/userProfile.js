import React from 'react';

const UserProfile = ({profile, handleSignOut}) => {
    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userNameProfile"><span>שם מלא</span><i data-toggle="tooltip" title="ערוך"
                                                                               className="fas fa-pencil-alt text-success mx-2"/></label>
                        <input type="text" className="form-control" id="userNameProfile"
                               placeholder={profile.userName} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhoneProfile"><span>טלפון</span><i data-toggle="tooltip" title="ערוך"
                                                                               className="fas fa-pencil-alt text-success mx-2"/></label>
                        <input type="text" className="form-control" id="userPhoneProfile"
                               placeholder={profile.phone} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userMailProfile">מייל</label>
                        <input type="text" className="form-control" id="userMailProfile"
                               placeholder={profile.email} disabled/>
                    </div>
                </form>
                <button onClick={handleSignOut} className="btn btn-danger btn-block">התנתק</button>

            </div>
        </div>
    );
};

export default UserProfile;