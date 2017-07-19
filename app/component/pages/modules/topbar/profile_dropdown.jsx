import React from "react";
import { connect } from "react-redux";

import {Route} from "./../../../../actions/routerActioıns";

@connect(store=>{
    return {
        page : store.Router.page
    }
})
export default class Profile extends React.Component {
  constructor() {
    super();
  }
  render() {
    const that = this;
    return (
      <div className={"user-info-menu animated fadeIn"}>
        <ul>
          <li className={that.props.page["Profile"].active === true ? "active" : ""} onClick={(_=>{ that.props.dispatch(Route("Profile")) }).bind(that)}>
            <svg viewBox="0 0 24 24">
              <path
                d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"/>
            </svg>
            Profile
          </li>
          <li className={that.props.page["Groups"].active === true ? "active" : ""} onClick={(_=>{ that.props.dispatch(Route("Groups")) }).bind(that)}>
            <svg viewBox="0 0 24 24">
              <path
                d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"/>
            </svg>
            Groups
          </li>
          <li className={that.props.page["Notifications"].active === true ? "active" : ""} onClick={(_=>{ that.props.dispatch(Route("Notifications")) }).bind(that)}>
            <svg viewBox="0 0 24 24">
              <path
                d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z"/>
            </svg>
            Notifications
          </li>
          <li>
            <svg viewBox="0 0 24 24">
              <path
                d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"/>
            </svg>
            Logout
          </li>
        </ul>
      </div>
    );
  }
}
