import React from "react";

export default class Loading extends React.Component {
    constructor(){
        super();
    }
    render() {
        const that = this;
        return (
            <div className="loading-page animated fadeIn">
                 <div class="loader"></div>
            </div>
        );
    }
}
