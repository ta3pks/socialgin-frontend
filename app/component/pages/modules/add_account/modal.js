import React from "react";
import { connect } from "react-redux";

import {modalOpen, modalClose} from "./../../../../actions/modalActions";

@connect(store=>{
    return {
        open : store.Modal.open
    }
})

export default class Modal extends React.Component {
    constructor(){
        super();
        this.state = {}
    }
    closeModal(e){
        if(e.target.classList.contains("modal")){
            this.props.dispatch(modalClose())
        }
    }
    render() {
        const that = this;
         return (
            <div>
                {(_=>{
                    if(that.props.open){
                        return (
                            <div className="modal open animated fadeIn" onClick={that.closeModal.bind(that)}>
                                <div className="modal-container animated bounceInDown" onClick={(_=>{console.log("Açması gerekiyor.")}).bind(that)}>
                                    <div className="modal-head">
                                        <svg className="close_modal" viewBox="0 0 24 24">
                                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
}
