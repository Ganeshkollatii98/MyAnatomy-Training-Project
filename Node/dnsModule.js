var dns=require('dns')

dns.lookup('www.google.com.co',(err,address,family)=>{
    console.log("Address :" +address);
    console.log("Family :"+family);
})