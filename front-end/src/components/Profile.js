import React, { useEffect, useState } from "react";

const Profile=()=>{
    const [userdata,setData]=useState(null);
    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem('user')));
    },[]);
    return(
        <div className="profile-container">
        <div className="profile-box">
            <h2>Profile Details</h2>
            {userdata ? (
                <div>
                    <p><strong>Name:</strong> {userdata.name}</p>
                    <p><strong>Email:</strong> {userdata.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
    );
}
export default Profile;