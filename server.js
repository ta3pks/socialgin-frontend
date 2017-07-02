const http = require('http');
var url = require('url')
const api = require("./fake-api.js");
const status = true;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const reqUrl = url.parse(req.url).pathname;
    if(api[reqUrl]){
        const send = status ? api[reqUrl].success : api[reqUrl].error
        res.end(JSON.stringify(send))
    }else{
        res.end(JSON.stringify({
            error : "Not found !",
            code : 0
        }))
    }
});

server.listen(8000, _=>{
    console.log("Fake api basladi !")
});