import React from "react";
import {connect} from  "react-redux";

import {statusUpdate, urlShare, imageShare} from "./../../actions/shareActions";

@connect(store=>{
    return {
        accounts : store.Accounts.list
    }
})

export default class ShareSystem extends React.Component {
    constructor() {
        super();
        const now = new Date();
        const allDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
        let days = [];
        for (let i = 1; i <= allDays; i++) {
            days.push(i.toString())
        }
        let years = [];
        for(let i=now.getFullYear(); i<now.getFullYear()+10; i++){
            years.push(i.toString());
        }
        this.state = {
            calendar : false,
            link : false,
            upload : false,
            thisYear : now.getFullYear(),
            thisMonth : now.getMonth() + 1,
            thisDay : now.getDate(),
            thisHour: now.getHours(),
            thisMinute : now.getMinutes(),
            status : "",
            days : days,
            years : years,
            images : [],
            url : "",
            urlMeta : "",
            notification : localStorage.getItem("notification") ? (localStorage.getItem("notification") == "false" ? false : true) : true 
        }
    }
    updateStatus(e) {
        this.setState({
            status : e.target.value
        })
    }
    dayHandler(e){
        this.setState({
            thisDay : e.target.value
        })
    }
    monthHandler(e){
        this.setState({
            thisMonth : e.target.value
        })
    }
    yearHandler(e){
        this.setState({
            thisYear : e.target.value
        })
    }
    minuteHandler(e){
        this.setState({
            thisMinute : e.target.value
        })
    }
    hourHandler(e){
        this.setState({
            thisHour : e.target.value
        })
    }
    openCallendar(){
        this.setState({
            calendar : !this.state.calendar
        })
    }
    openLink(){
        this.setState({
            link : !this.state.link,
            upload : false
        })
    }
    openUpload(){
        this.setState({
            link : false,
            upload : !this.state.upload
        })
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
            ajax.open("POST", "/api/get_meta", true);
            ajax.onload = function(){
                const res = JSON.parse(ajax.response);
                if(res.code == 0) return
                if(res.data.error) return
                that.setState({urlMeta : {
                    picture : res.data.links.thumbnail ? res.data.links.thumbnail[0].href : "",
                    title : res.data.meta.title,
                    description :res.data.meta.description,
                    url : that.state.url,
                    site : res.data.meta.site
                }})
            }
            ajax.send(JSON.stringify({
                data : that.state.url
            }))
        }else{
            that.setState({urlMeta : ""})
        }
      })
    }
    fileAdder(e){
      const that = this;
      const files = e.target.files;
      if (!files.length) return;
      that.setState({images : []}, function(){
          for(let i = 0; i<files.length; i++){
              const image = new Image();
              const reader = new FileReader();
              reader.onload = (e) => {
                  let fileList = that.state.images.slice();
                  fileList.push(e.target.result)
                  that.setState({images: fileList});
              };
              reader.readAsDataURL(files[i]);
            }
      })
    }
    fileOpenner(e){
      var inputField = this.refs.fileField;
      inputField.click()
    }
    shareHandler(e){
        const that = this;
        var button = e.target;
        button.innerHTML = "Please wait..."
        button.disabled = true;
        let userFound = false;
        for(let key in that.props.accounts){
            if(that.props.accounts.hasOwnProperty(key)){
                if(that.props.accounts[key].selected){
                    if(!that.state.link && !that.state.upload){
                        let date = new Date(that.state.thisYear, that.state.thisMonth, that.state.thisDay, that.state.thisHour, that.state.thisMinute)
                        statusUpdate(that.props.accounts[key], that.state.status, date, that.state.notification);
                        
                    } else if(that.state.link){
                        let date = new Date(that.state.thisYear, that.state.thisMonth, that.state.thisDay, that.state.thisHour, that.state.thisMinute)
                        urlShare(that.props.accounts[key], that.state.status, date, that.state.url, that.state.notification)
                    }else if(that.state.upload){
                        let date = new Date(that.state.thisYear, that.state.thisMonth, that.state.thisDay, that.state.thisHour, that.state.thisMinute)
                        imageShare(that.props.accounts[key], that.state.status, date, that.refs.fileField.files[0], that.state.notification)
                    }
                    userFound = true;
                }
            }
        }
        button.innerHTML = "Update"
        button.disabled = false;
        if(!userFound) return swal("Error !", "Please select an account.", "error")
        
    }
    render() {
        const that = this;
        return (
            <div className="share-area">
                <div className="share-panel">
                    <div className="card">
                        <div className="card-header">
                            <h4>Status Update</h4>
                        </div>
                        <div className="card-body">
                            <textarea onChange={that.updateStatus.bind(that)} value={that.props.status} rows="5" className="textarea" placeholder="What is in your mind ?"></textarea>
                        </div>
                        <div className="card-footer">
                            <div className="left">
                                <button onClick={that.openCallendar.bind(that)} className={that.state.calendar ? "share-variant active" : "share-variant"}>
                                    <i class="fa fa-calendar"></i>
                                </button>
                                <button onClick={that.openLink.bind(that)} className={that.state.link ? "share-variant active" : "share-variant"}>
                                    <i class="fa fa-link"></i>
                                </button>
                                <button onClick={that.openUpload.bind(that)} className={that.state.upload ? "share-variant active" : "share-variant"}>
                                    <i class="fa fa-picture-o"></i>
                                </button>
                                <button onClick={(_=>{that.setState({notification : !that.state.notification}, _=>{localStorage.setItem("notification", that.state.notification)});}).bind(that)} className={that.state.notification ? "share-variant active" : "share-variant"}>
                                    <i class="fa fa-bell" aria-hidden="true"></i>
                                </button>
                                {that.state.notification ? "Notifications active" : "Notifications not active"}
                            </div>
                            <div className="right">
                                <button onClick={that.shareHandler.bind(that)} type="submit" class="share-button">Update</button>
                            </div>
                        </div>
                        <div className="share-variants">
                            <div className={that.state.calendar ? "calendar active" : "calendar"}>
                                <div className="date">
                                    <div className="title">Select Date :</div>
                                    <select onChange={that.dayHandler.bind(that)} value={that.state.thisDay}>
                                        {that.state.days.map(day=>{
                                            return <option key={day} value={day}>{day}</option>
                                        })}
                                    </select>
                                    <select onChange={that.monthHandler.bind(that)} value={that.state.thisMonth}>
                                        <option value='1'>Janaury</option>
                                        <option value='2'>February</option>
                                        <option value='3'>March</option>
                                        <option value='4'>April</option>
                                        <option value='5'>May</option>
                                        <option value='6'>June</option>
                                        <option value='7'>July</option>
                                        <option value='8'>August</option>
                                        <option value='9'>September</option>
                                        <option value='10'>October</option>
                                        <option value='11'>November</option>
                                        <option value='12'>December</option>
                                    </select>
                                    <select onChange={that.yearHandler.bind(that)} value={that.state.thisYear}>
                                        {that.state.years.map(year=>{
                                            return <option key={year} value={year}>{year}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="time">
                                    <div className="title">Select Time :</div>
                                    <select onChange={that.hourHandler.bind(that)} value={that.state.thisHour}>
                                        <option value="0">00</option>
                                        <option value="1">01</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                        <option value="5">05</option>
                                        <option value="6">06</option>
                                        <option value="7">07</option>
                                        <option value="8">08</option>
                                        <option value="9">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                    </select>
                                    <span className="saperite">:</span>
                                    <select onChange={that.minuteHandler.bind(that)} value={that.state.thisMinute}>
                                        <option value="00">00</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                        <option value="53">53</option>
                                        <option value="54">54</option>
                                        <option value="55">55</option>
                                        <option value="56">56</option>
                                        <option value="57">57</option>
                                        <option value="58">58</option>
                                        <option value="59">59</option>
                                    </select>
                                </div>
                            </div>
                            <div className={that.state.link ? "share_uri active" : "share_uri"}>
                                <input onChange={that.urlHandler.bind(that)} value={that.state.url} type="text" placeholder="Please enter your url."/>
                                <div className={that.state.urlMeta ? "url_info active" : "url_info"}>
                                    <div className="image-area">
                                        <a href={that.state.urlMeta.url}>
                                            <img src={that.state.urlMeta.picture}/>
                                        </a>
                                    </div>
                                    <div className="info-area">
                                        <h1>{that.state.urlMeta.title}</h1>
                                        <span>{that.state.urlMeta.description}</span>
                                        <a href={that.state.urlMeta.url}>{that.state.urlMeta.site}</a>
                                    </div>
                                </div>
                            </div>
                            <div onClick={that.fileOpenner.bind(that)} className={that.state.upload ? "upload_image active" : "upload_image"}>
                                <input onChange={that.fileAdder.bind(that)} className={"files-input"} ref="fileField" type="file" accept=".jpg,.jpeg,.png" />
                                <div className="image-area">
                                    {this.state.images.map(function(data, key){
                                        return <img key={key} src={data}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
