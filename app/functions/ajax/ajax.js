import axios from "axios";
import swal from "sweetalert";


import {
    logger
} from "./middlewares/index";
import config from "../../config";
import Language from "../../language/index";
import cookier from "../../../public/js/cookier";

const methods = [
    "post",
    "get",
    "delete",
    "put"
]

const headers = [
    "multipart/form-data",
    "application/x-www-form-urlencoded"
]

module.exports = function (method, endpoint, data, middleware, contentType) {
    return new Promise((resolve, reject) => {
        // Setting language...
        const language = Language[cookier.parse("lang") || "eng"];
        // Method control
        if (!method || typeof method != "string" || methods.indexOf(method) == -1) return reject({
            error: language["wrongRequest"],
            reason: method || language["methodNotFound"]
        })

        //endpoint control
        if (!endpoint || typeof endpoint != "string") return reject({
            error: language["wrongEndpoint"],
            reason: endpoint ||  "Endpoint " + language["notfound"]
        })

        //Content Type control
        if (!contentType || typeof contentType != "number") return reject({
            error: language["wrongContentType"],
            reason: contentType ||  "Content Type " + language["notfound"]
        })

        //I will not control the data. It can be empty or form data. 
        const axiosConfig = {
            baseURL: config.baseURL,
            timeout: config.timeout,
            url: endpoint,
            method: method,
            headers: {
                'Content-Type': headers[contentType] || headers[1]
            }
        }
        if (data) {
            if (data.params) {
                axiosConfig.params = data.params
            } else {
                axiosConfig.data = data
            }
        }
        return axios(axiosConfig).then(results => {
            if (middleware) {
                logger({
                    baseURL: config.baseURL,
                    endpoint: endpoint,
                    sendedData: data,
                    results: results,
                    method: method,
                    contentType: headers[contentType] || headers[1]
                })
            }
            const res = results.data;
            if (res.error) {
                if (res.err_id && res.err_id != "-1") {
                    return swal({
                        title: language["errorAccured"] + " \n " + language["code"] + " : " + res.err_id,
                        text: language["copyThisCode"],
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "rgba(52, 152, 219,1.0)",
                        confirmButtonText: language["copy"],
                        closeOnConfirm: false
                    }, function () {
                        var textField = document.createElement('textarea')
                        textField.innerText = res.err_id;
                        document.body.appendChild(textField)
                        textField.select()
                        document.execCommand('copy')
                        textField.remove()
                        swal(language["copied"], language["contactUsWithThisEmail"], "success");
                    });
                }
                return reject(res)
            }
            return resolve(res)
        }).catch(err => {
            if (!err) return swal(language["error"], language["somethingWrong"], "error");            
            if (middleware) {
                logger({
                    baseURL: config.baseURL,
                    endpoint: endpoint,
                    sendedData: data,
                    error: {
                        error: err.message || err.error || language["somethingWrong"],
                        stack: err.stack || ""
                    },
                    method: method,
                    contentType: headers[contentType] || headers[1]
                })
            }
            return reject(err)
        })
    })
}