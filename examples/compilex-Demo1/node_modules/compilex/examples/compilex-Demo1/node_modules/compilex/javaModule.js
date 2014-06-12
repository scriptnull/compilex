var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');


exports.stats = false ;

exports.compileJava = function (envData , code , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
		{
			fs.writeFile( path  + "/Main.java" , code  , function(err ){			
				if(err && exports.stats)
					console.log('ERROR: '.red + err);
			    else
			    {
			    	if(exports.stats)
			    		console.log('INFO: '.green + path + "/Main.java created");				    	
			    	
			    	if(envData.OS === "windows")
						var command = "cd "+path+ " & " + " javac Main.java";
					exec(command , function( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)							
								console.log("INFO: ".green + path + "/Main.java contained an error while compiling");
							var out = {error : stderr };
							fn(out);
						}
						else
						{
							console.log("INFO: ".green + "compiled a java file");
							var command = "cd "+path+" & java Main";
							exec(command , function( error , stdout , stderr ){
								if(error)
								{
												
									if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
									{
										var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'};
										fn(out);
									}
									else
									{
										if(exports.stats)
										{
											console.log('INFO: '.green + path  + '/Main.java contained an error while executing');
										}										
										var out = { error : stderr};
										fn(out);
									}	
								}
								else
								{						
									if(exports.stats)
									{
										console.log('INFO: '.green + path + '/Main.java successfully compiled and executed !');
									}
									var out = { output : stdout};
									fn(out);										
								}
							});		
						}
					});
			    }		   
			});					
		}
	});
}



exports.compileJavaWithInput = function (envData , code , input , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
		{
			fs.writeFile( path  + "/Main.java" , code  , function(err ){			
				if(err && exports.stats)
					console.log('ERROR: '.red + err);
			    else
			    {
			    	if(exports.stats)
			    		console.log('INFO: '.green + path + "/Main.java created");				    	
			    	fs.writeFile( path + "/input.txt" , input , function (err){
			    		if(err && exports.stats)
							console.log('ERROR: '.red + err);
						else
						{
							if(envData.OS === "windows")
							var command = "cd "+path+ " & " + " javac Main.java";
							exec(command , function( error , stdout , stderr ){						
								if(error)
								{
									if(exports.stats)							
										console.log("INFO: ".green + path + "/Main.java contained an error while compiling");
									var out = {error :  stderr };
									fn(out);
								}
								else
								{
									console.log("INFO: ".green + "compiled a java file");
									var command = "cd "+path+" & java Main < input.txt";
									exec(command , function( error , stdout , stderr ){
										if(error)
										{
											
											if(exports.stats)
											{
												console.log('INFO: '.green + path  + '/Main.java contained an error while executing');
											}			
											if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
											{
												var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'};
												fn(out);
											}
											else
											{
												var out = { error : stderr};
												fn(out);
											}	
										}
										else
										{						
											if(exports.stats)
											{
												console.log('INFO: '.green + path + '/Main.java successfully compiled and executed !');
											}
											var out = { output : stdout};
											fn(out);										
										}
									});		
								}
			    			});
			    		}
					});
			    }		   
			});					
		}
	});
}
