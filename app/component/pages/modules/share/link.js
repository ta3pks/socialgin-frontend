import React from "react";


export default class Link extends React.Component {
    constructor(){
        super();
        this.state = {
            url : "",
            urlMeta : ""
        }
    }
    isURL(str) {
     var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
     var url = new RegExp(urlRegex, 'i');
     return str.length < 2083 && url.test(str);
    }
    urlHandler(e){
      const that = this;
      this.setState({url : e.target.value}, function(){
        if(this.isURL(this.state.url)){
            var ajax = new XMLHttpRequest();
            ajax.open("GET", "http://iframe.ly/api/iframely?url=" + that.state.url + "&api_key=3a42e524be039ac6afaf5e", true);
            ajax.onload = function(){
                console.log(ajax.response)
                const res = JSON.parse(ajax.response);
                if(!res || !res.meta) return;
                that.setState({
                    urlMeta : res
                })
            }
            ajax.send()
        }else{
            that.setState({urlMeta : ""})
        }
      })
    }
    render() {
        const that = this;
        console.log(this.state.urlMeta)
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
