import React from "react";

export default class Notifications extends React.Component {
  constructor() {
    super();
  }
  render() {
    const that = this;
    return (
      <div className={"nutification-area animated fadeIn"}>
        <div className="top-notifications">
          <span>Notifications</span>
          <svg viewBox="0 0 24 24">
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </div>
        <div className="notifications-content">
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
          <div className="notify">
            <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="date">01.02.2019 15:39</span>
          </div>
        </div>
        <div className="notifications-footer">
          <button className="btn red">
            Wiew all notifications
          </button>
        </div>
      </div>
    );
  }
}
