var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.get('/' , function (req , res ) {

	res.sendfile( __dirname + "/index.html");

});


app.post('/compilecode' , function (req , res ) {
    
	var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    
    if(inputRadio === "true")
    {    
    	var envData = { OS : "windows" , cmd : "g++"};	   	
    	compiler.compileCPPWithInput(envData , code ,input , function (data) {
    		if(data.error)
    		{
    			res.send(data.error);    		
    		}
    		else
    		{
    			res.send(data.output);
    		}
    	});
	}
	else
	{
		
		var envData = { OS : "windows" , cmd : "g++"};	   
    	compiler.compileCPP(envData , code , function (data) {
    	if(data.error)
    	{
    		res.send(data.error);
    	}    	
    	else
    	{
    		res.send(data.output);
    	}

    });
	}
});

app.listen(8080);
