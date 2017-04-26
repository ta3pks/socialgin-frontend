import React from "react";

export default class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {}
    }
    render() {
        const that = this;
        return (
            <div className="sidebar">
                <div className="toggle">
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                    </svg>
                </div>
                <div className="add-account">
                    <button className="btn red">
                        ADD ACCOUNT
                    </button>
                </div>
                <div className="search-area">
                    <svg viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                    <input type="text" className="material-input" placeholder="Search Account"/>
                </div>
                <div className="account-list">
                    <div className="account facebook">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                    <div className="account twitter">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                    <div className="account linkedin active">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                    <div className="account twitter">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                    <div className="account twitter">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                    <div className="account twitter">
                        <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                        Muhammed Furkan AYDIN
                    </div>
                </div>
            </div>
        );
    }
}
