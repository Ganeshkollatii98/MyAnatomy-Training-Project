var url = require("url");

var address = "http://localhost:4200/Login?uid=ganesh&pwd=Admin"

var urlparse =url.parse(address,true);
console.log("host :"+urlparse.host);
console.log("\n path : "+urlparse.path + " path name : " + urlparse.pathname)
console.log("search string : "+ urlparse.search);


var qry = urlparse.query;

console.log("uID OF the search string : "+qry.uid);
console.log("pwd of search string :"+qry.pwd);


