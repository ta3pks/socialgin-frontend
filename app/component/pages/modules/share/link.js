import React from "react";
import { connect } from "react-redux";

import {setLink} from "./../../../../actions/shareActions";

@connect(store=>{
    return {
        link : store.Share.link
    }
})

export default class Link extends React.Component {
    constructor(){
        super();
        this.state = {
            url : "",
            urlMeta : ""
        }
    }
    urlHandler(e){
        this.props.dispatch(setLink(e.currentTarget.value));
    }
    render() {
        const that = this;
        return (
            <div className="share_link animated fadeIn">
                <input onChange={that.urlHandler.bind(that)} type="text" className="material-input" placeholder="Please enter url you have."/>
                <div className="url_contain">
                    {(_=>{
                        if(that.state.urlMeta.links && that.state.urlMeta.links.thumbnail.length){
                             return(
                                 <div className="thumbnail">
                                     <img src={that.state.urlMeta.links.thumbnail[0].href} alt=""/>
                                 </div>)
                        }
                    })()}
                    {(_=>{
                        if(that.state.urlMeta.meta){
                             return(
                                 <div className="url_meta">
                                     <h1>{that.state.urlMeta.meta.title}</h1>
                                     <p>{that.state.urlMeta.meta.description}</p>
                                     <span><a href={that.state.urlMeta.meta.canonical}>{that.state.urlMeta.meta.site}</a></span>
                                 </div>)
                        }
                    })()}  
                </div>
                
            </div>
        );
    }
}
