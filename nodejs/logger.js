const url= 'http//mylogger.io/log';
function log(message){
    //send an http request 
    globalThis.console.log(message);
}

module.exports.log = log;