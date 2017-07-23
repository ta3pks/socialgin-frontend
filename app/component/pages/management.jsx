import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import notifier from "notifier/js/notifier.js";
import cookier from "../../../public/js/cookier";

import Schedule from "./modules/share/schedule";

import {setText, cleanForm, addImage, removeImage, setLink} from "./../../actions/shareActions";

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
            share_loading : false,
            closeUrl : false,
            urlIframe : null
        }
    }
    textHandler(e){
        this.props.dispatch(setText(e.currentTarget.value))
        this.urlify(this.props.text)
        if(e.currentTarget.value.length === 0){
            this.setState({
                closeUrl : false,
                urlIframe : null
            })
            this.props.dispatch(setLink(""))
        }
    }
    startShare(){
        if(this.state.share_loading) return;
        const user_data = cookier.parse("token");
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
        if(that.props.link && that.props.images.length === 0 && !that.state.closeUrl){
            form.append("link", that.props.link)
        }
        const shareDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth(), that.props.date.getDate(), parseInt(that.props.hour), parseInt(that.props.minute)).getTime() / 1000)
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
    fileAdder(e){
        const that = this;
        const files = e.target.files;
        if (!files.length) return;
        if(files.length > 4 || that.props.images.length > 3) return swal("Error !", "You can add up to 4 images.", "error");
        for(let i = 0; i<files.length; i++){
            const reader = new FileReader();
            reader.onload = e=>{
                that.props.dispatch(addImage({
                    source : files[i],
                    image : e.target.result
                }));
            };
            reader.readAsDataURL(files[i]);
        }
    }
    removeImage(e){
        const that = this;
        const target = e.currentTarget.dataset.index;
        that.props.dispatch(removeImage(target));
    }
    urlify(text) {
        const that = this;
        var urlRegex = /(https?:\/\/[^\s]+\s)/g;
        return text.replace(urlRegex, function(url) {
            if(url == that.props.link || that.state.closeUrl) return;
            that.props.dispatch(setLink(url))
            axios.get("http://iframe.ly/api/iframely?url=" + url.trim() + "&api_key=3a42e524be039ac6afaf5e").then(data=>{
                that.setState({
                    urlIframe : data.data
                })
            })
        })
    }
    componentDidMount(){}
    render() {
        const that = this;
        console.log("link : ", that.props.link)
        return (
            <div className="management-page animated fadeIn">
                <div className="panel">
                    <div className="share-panel">
                        <textarea value={that.props.text} onChange={that.textHandler.bind(that)} className={that.props.text.length > 0 ? "material-input big full" : "material-input big"} placeholder="Status update"></textarea>
                        <div className="controller"> 
                            <div className="left-bar">
                                <button onClick={(_=>{const input = that.refs.fileField; input.click()}).bind(that)} className={that.props.images.length > 0 ? "btn small active" : "btn small"}>
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
                        {(_=>{
                            if(that.props.text || that.props.images.length > 0 || that.props.link){
                                return (
                                    <div className="first-show">
                                        <div className="show-header">
                                            <span>Preview post</span>
                                        </div>
                                        {(_=>{
                                            if(that.props.text){
                                                return(
                                                    <div className="content">
                                                        <div dangerouslySetInnerHTML={{__html: that.props.text.replace(/\r\n|\r|\n/gm, " <br>")}}>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {(_=>{
                                            if(that.props.images.length === 0 && that.props.link && !that.state.closeUrl && that.state.urlIframe){
                                                return (
                                                    <div className="link-preview">
                                                        {(_=>{
                                                            if(that.state.urlIframe.links && that.state.urlIframe.links.thumbnail){
                                                                var style = {
                                                                    color: 'white',
                                                                    backgroundImage: "url("+that.state.urlIframe.links.thumbnail[0].href+")",
                                                                    backgroundRepeat: "no-repeat",
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center top",
                                                                    boxSizing: "border-box",
                                                                    position: "relative"
                                                                };
                                                                return (
                                                                    <div className="link-thumbnail" style={style}>
                                                                    </div>
                                                                )
                                                            }
                                                        })()}
                                                        {(_=>{
                                                            if(that.state.urlIframe.meta){
                                                                return(
                                                                    <div className="link-info">
                                                                        <div className="title">
                                                                            {(_=>{
                                                                                if(that.state.urlIframe.meta.title){
                                                                                    return that.state.urlIframe.meta.title
                                                                                }
                                                                            })()}
                                                                        </div>
                                                                        <div className="description">
                                                                            {(_=>{
                                                                                if(that.state.urlIframe.meta.description){
                                                                                    return that.state.urlIframe.meta.description
                                                                                }
                                                                            })()}
                                                                        </div>
                                                                        <div className="close-url">
                                                                            <svg viewBox="0 0 24 24" onClick={(_=>{ that.setState({closeUrl : true})}).bind(that)}>
                                                                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })()}
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {(_=>{
                                            if(that.props.images.length > 0){
                                                return (
                                                    <div className="upload_image animated fadeIn">
                                                        <div className="image-area">
                                                            {that.props.images.map((value, key)=>{
                                                                return(
                                                                    <div className="image" key={window.keyGenerator()}>
                                                                        <img src={value.image} alt=""/>
                                                                        <div className="remove-image">
                                                                            <svg viewBox="0 0 24 24" onClick={that.removeImage.bind(that)} data-index={key}>
                                                                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                    </div>
                                )
                            }
                        })()}
                        <input className="dont-show" multiple="multiple" onChange={that.fileAdder.bind(that)} ref="fileField" type="file" accept=".jpg,.jpeg,.png" />
                    </div>
                    <div className="share-settings">
                        <Schedule />
                    </div>
                </div>
            </div>
        );
    }
}
