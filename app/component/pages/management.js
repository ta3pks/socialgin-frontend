import React from "react";
import { connect } from "react-redux";

import Schedule from "./modules/share/schedule";
import UploadImage from "./modules/share/upload_image";
import Link from "./modules/share/link";

import {setText} from "./../../actions/shareActions";

import XHR from "./../modules/ajax";
import config from "./../../config";

@connect(store=>{
    return {
        text : store.Share.text,
        images : store.Share.images,
        link : store.Share.link,
        date : store.Share.date,
    }
})

export default class Management extends React.Component {
    constructor(){
        super();
        this.state = {
            schedule : false,
            upload_image : false,
            share_link : false
        }
    }
    textHandler(e){
        this.props.dispatch(setText(e.currentTarget.value))
    }
    startShare(){
        const that = this;
        if(!that.props.text && !that.props.images.length && !that.props.link){
            return swal("Error !", "Your content is empty.", "warning");
        }
        const form = new FormData();
        if(that.props.text){
            form.append("text", that.props.text);
        }
        if(that.props.images.length > 0 && that.state.upload_image){
            that.props.images.forEach(image=>{
                form.append("images", image)
            })
        }
        if(that.props.link && that.state.share_link){
            form.append("link", that.props.link)
        }
        form.append("date", that.props.date.toString())
        const user_data = window.localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
        const ajax = new XHR(user_data, config.api_url + config.share, form);
        ajax.formRequest(data=>{
            console.log(data)
        })
    }
    render() {
        const that = this;
        return (
            <div className="management-page animated fadeIn">
                <div className="panel">
                    <textarea value={that.props.text} onChange={that.textHandler.bind(that)} className={that.props.text.length > 0 ? "material-input big full" : "material-input big"} placeholder="Status update"></textarea>
                    <div className="controller"> 
                        <div className="left-bar">
                            <button onClick={(_=>{that.setState({schedule : !that.state.schedule})}).bind(that)} className={that.state.schedule ? "btn small active" : "btn small"}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z" />
                                </svg>
                            </button>
                             <button onClick={(_=>{if(that.state.share_link){that.setState({share_link : false})};that.setState({upload_image : !that.state.upload_image})}).bind(that)} className={that.state.upload_image ? "btn small active" : "btn small"}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M5,14L8.5,9.5L11,12.5L14.5,8L19,14M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
                                </svg>
                            </button>
                             <button onClick={(_=>{if(that.state.upload_image){that.setState({upload_image : false})};that.setState({share_link : !that.state.share_link})}).bind(that)} className={that.state.share_link ? "btn small active" : "btn small"}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="right-bar">
                            <button className="btn red" onClick={that.startShare.bind(that)}>
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="share-settings">
                        {(_=>{
                            if(that.state.schedule){
                                return <Schedule />
                            }
                        })()}
                        {(_=>{
                            if(that.state.upload_image){
                                return <UploadImage />
                            }else if(that.state.share_link){
                                 return <Link />
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}
