var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

//compileX
var compiler = require('compilex');
compiler.init();

app.get('/' , function (req , res ) {

	res.sendfile( __dirname + "/index.html");

});


app.post('/compilecode' , function (req , res ) {
    
	var code = req.body.code;	
	var input = req.body.input;

	if(input)
	{
	var envData = { OS : "windows" , cmd : "g++"};	   
    compiler.compileCPPWithInput(envData , code ,input , function (data) {
    	res.send(data);
    });
	}
	else
	{
	var envData = { OS : "windows" , cmd : "g++"};	   
    compiler.compileCPP(envData , code , function (data) {
    	res.send(data);
    });
	}

});

app.listen(8080);
