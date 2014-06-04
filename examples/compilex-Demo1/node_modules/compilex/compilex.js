var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');
var cppModule = require('./cppModule.js');
var javaModule = require('./javaModule.js');

exports.stats = false;

exports.init = function(option){
	if(option)
	{
		if(option.stats === true )
		{
			console.log('Statistics for compilex is On'.green);		
			exports.stats = true;			
		}
    }	
	fs.exists( './temp' , function(exists){		
		    if(!exists)
		    {
		        if(exports.stats)
		        {
		        	console.log('INFO: '.cyan + 'temp directory created for storing temporary files.'.cyan )
		        }		    	
		    	fs.mkdirSync('./temp');
		    }
	});
}

exports.compileCPP = function ( envData ,  code , fn ){
	if(exports.stats)
		cppModule.stats = true;
	cppModule.compileCPP(envData , code , fn );
}

exports.compileCPPWithInput = function ( envData , code , input ,  fn ) { 
	if(exports.stats)
		cppModule.stats = true;
	cppModule.compileCPPWithInput(envData , code , input , fn );	
}


exports.compileJava = function ( envData , code , fn ){
	if(exports.stats)
		javaModule.stats = true;
	javaModule.compileJava(envData , code,fn);
}

exports.compileJavaWithInput = function ( envData , code , input ,  fn ){
	if(exports.stats)
		javaModule.stats = true;
	javaModule.compileJavaWithInput( envData , code , input ,  fn );	
}


exports.flushSync = function() {
	    path = '	./temp/';
	    fs.readdir(path, function(err , files){ 
	    	if(!err)
	    	{
	    		for( var i = 0 ; i<files.length ; i++ )
	    		{
	    			
	    			fs.unlinkSync(path+files[i]);	    			

	    		}
	    	}
	    });
}

exports.flush = function(fn) {
	    path = './temp/';
	    fs.readdir(path, function(err , files){ 
	    	if(!err)
	    	{
	    		for( var i = 0 ; i<files.length ; i++ )
	    		{
	    			
	    			fs.unlinkSync(path+files[i]);	    			

	    		}
	    	}
	    });
	    fn();	    
}

