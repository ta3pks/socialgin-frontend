import React from "react";

export default class Management extends React.Component {
    constructor(){
        super();
    }
    render() {
        const that = this;
        return (
            <div className="management-page">
                <textarea className="material-input big" placeholder="Status update"></textarea>
            </div>
        );
    }
}
