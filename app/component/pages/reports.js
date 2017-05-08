import React from "react";

export default class Reports extends React.Component {
    constructor(){
        super();
    }
    render() {
        const that = this;
        return (
            <div className="reports-page animated fadeIn">
                <div className="coming_soon">
                    <h1>Coming Soon</h1>
                    <span>This page is under construction. Please come back later.</span>
                </div>
            </div>
        );
    }
}
