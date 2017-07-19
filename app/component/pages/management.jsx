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
                    <div className="share-settings">
                        {(_=>{
                            if(that.state.schedule){
                                return <Schedule />
                            }
                        })()}
                        {(_=>{
                            if(that.state.upload_image){
                                return <UploadImage />
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}
