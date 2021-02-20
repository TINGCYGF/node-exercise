"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
var https = __importStar(require("https"));
var querystring = __importStar(require("querystring"));
var md5 = require("md5");
var private_1 = require("./private");
var translate = function (word) {
    console.log('===');
    console.log(word);
    var salt = Math.random();
    var sign = md5(private_1.appId + word + salt + private_1.appSecret);
    var from, to;
    if (/[a-zA-Z]/.test(word[0])) {
        //英译中
        from = 'en';
        to = 'zh';
    }
    else {
        //中翻译英
        from = 'zh';
        to = 'en';
    }
    var query = querystring.stringify({
        q: word,
        from: from,
        to: to,
        appid: private_1.appId,
        salt: salt,
        sign: sign
    });
    var options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    var req = https.request(options, function (res) {
        var chunks = [];
        res.on('data', function (chunk) {
            console.log(chunk.constructor);
            chunks.push(chunk);
        });
        res.on('end', function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            //判断错误码
            if (object.error_code) {
                if (object.error_code === '52003') {
                    console.log('用户认证失败');
                }
                else {
                    console.error(object.error_msg);
                }
                //退出
                process.exit(2);
            }
            else {
                console.log(object.trans_result[0].dst);
                //成功也是退出
                process.exit(0);
            }
        });
    });
    req.on('error', function (e) {
        console.error(e);
    });
    req.end();
};
exports.translate = translate;
