import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import notifier from "notifier/js/notifier.js";

import Schedule from "./modules/share/schedule";
import UploadImage from "./modules/share/upload_image";

import {setText, cleanForm} from "./../../actions/shareActions";

import config from "./../../config";

@connect(store=>{
    return {
        text : store.Share.text,
        images : store.Share.images,
        link : store.Share.link,
        date : store.Share.date,
        hour : store.Share.hour,
        minute : store.Share.minute,
        accounts : store.User.list
    }
})
export default class Management extends React.Component {
    constructor(){
        super();
        this.state = {
            schedule : false,
            upload_image : false,
            share_link : false,
            share_loading : false
        }
    }
    textHandler(e){
        this.props.dispatch(setText(e.currentTarget.value))
    }
    startShare(){
        if(this.state.share_loading) return;
        const user_data = window.localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
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
        const shareDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth(), that.props.date.getDate(), parseInt(that.props.hour), parseInt(that.props.minute)).getTime() / 1000)
        console.log(shareDate)
        form.append("time", shareDate)
        var list = that.props.accounts;
        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                var account = list[key];
                if(account.selected === true){
                    form.append("accounts", JSON.stringify({
                        id :  account.id
                    }))
                }
            }
        }
        form.append("token", user_data)
        that.setState({
            share_loading : true
        })
        axios.post(config.share, form).then(data=>{
            console.log("Beta : ", data.data)
            that.setState({
                share_loading : false
            })
            const res = data.data;
            if(res.error) return swal("Error !", res.error, "error");
            notifier.show('Success !' , 'Sharing was successfuly.', 'success', '', 0);
            that.props.dispatch(cleanForm())
        }).catch(err=>{
            console.log("Beta : ", err),
            swal("Error !", "Somethings wrong. Please try again later.", "error");
            that.setState({
                share_loading : false
            })
        })
    }
    render() {
        const that = this;
        return (
            <div className="management-page animated fadeIn">
                <div className="panel">
                    <div className="share-panel">
                        <textarea value={that.props.text} onChange={that.textHandler.bind(that)} className={that.props.text.length > 0 ? "material-input big full" : "material-input big"} placeholder="Status update"></textarea>
                        <div className="controller"> 
                            <div className="left-bar">
                                <button onClick={(_=>{if(that.state.share_link){that.setState({share_link : false})};that.setState({upload_image : !that.state.upload_image})}).bind(that)} className={that.state.upload_image ? "btn small active" : "btn small"}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5,14L8.5,9.5L11,12.5L14.5,8L19,14M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="right-bar">
                                <button className={that.state.share_loading ? "btn red loading animated" : "btn red animated"} onClick={that.startShare.bind(that)}>
                                    {(_=>{
                                        if(that.state.share_loading){
                                            return <div class="button-loader"></div>
                                        }else{
                                            return "Send"
                                        }
                                    })()}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="share-settings">
                        <Schedule />
                    </div>
                </div>
            </div>
        );
    }
}
