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
        this.state = {
            facebook : false,
            twitter : false,
            linkedin : false
        }
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
                                    <div className={this.state.facebook || this.state.twitter || this.state.linkedin ? "modal-head inside" : "modal-head"}>
                                        {(_=>{
                                            if(this.state.facebook || this.state.twitter || this.state.linkedin){
                                                return(<svg className="close_modal animated fadeIn" viewBox="0 0 24 24"  onClick={(_=>{this.setState({facebook : false, twitter : false, linkedin : false})}).bind(that)}>
                                                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                                </svg>)
                                            }
                                        })()}
                                        <svg className="close_modal" viewBox="0 0 24 24" onClick={(_=>{this.props.dispatch(modalClose())}).bind(that)}>
                                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                        </svg>
                                    </div>
                                    <div className="modal-body">
                                        {(_=>{
                                            if(!this.state.facebook && !this.state.twitter && !this.state.linkedin){
                                                return (<div className="add-account">
                                            <h1>Add Account</h1>
                                            <p>Select the social media where your account is located.</p>
                                            <div className="social-select">
                                                <button className="circle-button facebook" onClick={(_=>{this.setState({facebook : true})}).bind(that)}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                                    </svg>
                                                </button>
                                                <button className="circle-button twitter" onClick={(_=>{this.setState({twitter : true})}).bind(that)}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                                                    </svg>
                                                </button>
                                                <button className="circle-button linkedin" onClick={(_=>{this.setState({linkedin : true})}).bind(that)}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>)
                                            }
                                        })()}
                                        {(_=>{
                                            if(this.state.facebook){
                                                return (
                                                    <div className="add_account">
                                                        <h1>Add Account from Facebook</h1>
                                                        <p>Once you connect, you will able to add: Pages, Groups and Profiles</p>
                                                        <button class="social-button facebook">
                                                            <div class="icon">
                                                                <svg viewBox="0 0 24 24">
                                                                    <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                                                </svg>
                                                            </div>
                                                            <div class="title">
                                                                Login with Facebook
                                                            </div>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })()}
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
