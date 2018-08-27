
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mysql=require('mysql');
var connection=mysql.createConnection({
host:'localhost',
user:'root',
paassword:'',
database:'jstable'
});

connection.connect(function(err){
         if(err) throw err
console.log("you are now connected"); 
}
);

app.use(bodyParser.urlencoded({extended:true})); 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "Name:</p><input type= 'text' name='name'>";
  html +="<br>";
  html += "address:</p><input type='text' name='address'>";
 html +="<br>";
  html += "Mobile number:</p><input type='text' name='mobilno'>";
 html +="<br>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});


 
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is" + req.body.name+"<br>";
  reply += "Your address is" + req.body.address+"<br>";
  reply += "Your mobile number is" + req.body.mobilno+"<br>";
  res.send(reply);

var n=req.body.name;
var a=req.body.address;
var p=req.body.mobilno;

var arr=[n,a,p];
var array=new Array();
for(var i=0;i<arr.length;i++)
{
const crypto = require('crypto'); 
var fs = require('fs');
const cipher = crypto.createCipher('aes192', '123'); // crypto.createCipher(algorithm, password[, options])
var encrypted = cipher.update(arr[i], 'utf8', 'hex'); 
encrypted += cipher.final('hex');
array.push(encrypted);
}

var sql="insert into tab200(Name,Address,Phonenumber)values('"+array[0]+"','"+array[1]+"','"+array[2]+"')";
connection.query(sql,function(err)
{
    if(err) throw err;
console.log("record is inserted successfully");
 });
res.send(reply);
});

app.get('/form1', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank1'  method='post' name='form2'>";
  html += " Select Name:</p><input type= 'text' name='sname'>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

 var a1;
 var encrypted1;
app.post('/thank1', urlencodedParser, function (req, res){
	var n5=req.body.sname;
	const crypto = require('crypto'); 
const cipher = crypto.createCipher('aes192', '123'); // crypto.createCipher(algorithm, password[, options])
encrypted1 = cipher.update(n5, 'utf8', 'hex'); 
encrypted1 += cipher.final('hex');
a1=encrypted1;
console.log(n5);
console.log(encrypted1);

});
               
app.get('/employee',function(req,res)
{
       connection.query('select * from tab200 where Name='+mysql.escape(encrypted1),function(error,results)
       {
               if(error) throw error;
               console.log(encrypted1);
               var one=JSON.stringify(results);
               res.end(one);
               var n2=JSON.parse(one);
               console.log(n2.name);
       });
});
