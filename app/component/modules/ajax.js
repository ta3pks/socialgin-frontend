import config from "./../../config";

export default class XHR {
    constructor(user_data, uri, whatWeWillSend) {
        if (!uri) return;
        this.uri = uri;
        this.whatWeWillSend = whatWeWillSend;
        this.user_data = user_data;
    }
    getRequest(callback) {
        const that = this;
        const timeout = setTimeout(function() {
            return callback({error : "Connection problem !"})
        }, 10000);
        const ajax = new XMLHttpRequest()
        ajax.open("POST", config.api_url + config.authorize, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            clearTimeout(timeout);
            const constoller = JSON.parse(ajax.response);
            if (constoller.error) {
                return callback({
                    error: constoller.error
                })
            }
            const token = constoller.data;
            const requestTimeOut = setTimeout(_=>{
                return callback({error : "Connection problem !"})
            }, 10000)
            const xhr = new XMLHttpRequest();
            xhr.open("GET", that.uri + `?token=${encodeURIComponent(token)}&${that.whatWeWillSend}`, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function(){
                clearTimeout(requestTimeOut);
                const data = JSON.parse(xhr.response);
                callback(data)
            }
            xhr.send();
        };
        ajax.send(`authenticationtoken=${encodeURIComponent(that.user_data)}`)
    }
    postRequest(callback) {
        const that = this;
        const timeout = setTimeout(function() {
            return callback({error : "Connection problem !"})
        }, 10000);
        const ajax = new XMLHttpRequest()
        ajax.open("POST", config.api_url + config.authorize, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            clearTimeout(timeout);
            const constoller = JSON.parse(ajax.response);
            if (constoller.error) {
                return callback({
                    error: constoller.error
                })
            }
            const token = constoller.data;
            const requestTimeOut = setTimeout(_=>{
                return callback({error : "Connection problem !"})
            }, 10000)
            const xhr = new XMLHttpRequest();
            xhr.open("POST", that.uri, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function(){
                clearTimeout(requestTimeOut);
                const data = JSON.parse(xhr.response);
                callback(data)
            }
            xhr.send(`token=${encodeURIComponent(token)}&${that.whatWeWillSend}`);
        };
        ajax.send(`authenticationtoken=${encodeURIComponent(that.user_data)}`)
    }
    formRequest(callback) {
        const that = this;
        const timeout = setTimeout(function() {
            return callback({error : "Connection problem !"})
        }, 10000);
        const ajax = new XMLHttpRequest()
        ajax.open("POST", config.api_url + config.authorize, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            clearTimeout(timeout);
            const constoller = JSON.parse(ajax.response);
            if (constoller.error) {
                return callback({
                    error: constoller.error
                })
            }
            const token = constoller.data;
            const requestTimeOut = setTimeout(_=>{
                return callback({error : "Connection problem !"})
            }, 10000)
            const xhr = new XMLHttpRequest();
            xhr.open("POST", that.uri + "?token=" + token, true);
            xhr.onload = function(){
                clearTimeout(requestTimeOut);
                const data = JSON.parse(xhr.response);
                callback(data)
            }
            xhr.send(that.whatWeWillSend);
        };
        ajax.send(`authenticationtoken=${encodeURIComponent(that.user_data)}`)
    }
}