const http = require('http')

function formatApi(api){
  return "http://www.Ting.com"+api;
}

http.createServer((require,respons) => {
  console.log(require.url);
})