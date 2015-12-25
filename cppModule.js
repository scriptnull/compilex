var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');


exports.stats = false ;


exports.compileCPP = function ( envData ,  code , fn ) {
	//creating source file
	var filename = cuid.slug();
	path = './temp/';


	//create temp0
	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '.red + err);
			else
			{
				console.log('INFO: '.green + filename +'.cpp created');
				//compiling and exrcuiting source code
				if(envData.cmd === 'g++')
				{

					//compile c code
					commmand = 'g++ ' + path + filename +'.cpp -o '+path + filename +'.exe' ;
					exec(commmand , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
							}
							var out = { error : stderr };
							fn(out);
						}
						else
						{
							var progNotFinished=true;
							var tempcommand = "cd temp & "+ filename ;
							exec( tempcommand , function ( error , stdout , stderr ){
								if(error)
								{

									if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
									{
										var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
										fn(out);
									}
									else
									{
										if(exports.stats)
										{
											console.log('INFO: '.green + filename + '.cpp contained an error while executing');
										}

										var out = { error : stderr };
										fn(out);
									}
								}
								else
								{
									if(progNotFinished){
										progNotFinished=false;// programme finished
										if(exports.stats)
										{
											console.log('INFO: '.green + filename + '.cpp successfully compiled and executed !');
										}
										var out = { output : stdout};
										fn(out);
									}
								}
							});
							if(envData.options.timeout)
							{
								// kill the programme after envData.options.timeout ms
								setTimeout(function (){
									exec("taskkill /im "+filename+".exe /f > nul",function( error , stdout , stderr ){
										if(progNotFinished)
										{
											progNotFinished=false;// programme finished
											if(exports.stats)
											{
												console.log('INFO: '.green + filename + '.exe was killed after '+envData.options.timeout+'ms');
											}
											var out = { timeout : true};
											fn(out);
										}
									});
								},envData.options.timeout);
							}
						}

					});


				}
				else if(envData.cmd === 'gcc')
				{
					//compile c code
					commmand = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(commmand , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
							}
							var out = { error : stderr};
							fn(out);
						}
						else
						{
							exec( path + filename + '.out', function ( error , stdout , stderr ){
								if(error)
								{
									if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
									{
										var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
										fn(out);
									}
									else
									{
										if(exports.stats)
										{
											console.log('INFO: '.green + filename + '.cpp contained an error while executing');
										}
										var out = { error : stderr };
										fn(out);
									}
								}
								else
								{
									if(exports.stats)
									{
										console.log('INFO: '.green + filename + '.cpp successfully compiled and executed !');
									}
									var out = { output : stdout};
									fn(out);
								}
							});

						}
					});
				}
				else
				{
					console.log('ERROR: '.red + 'choose either g++ or gcc ');
				}
			}	//end of else part of err
		}	//end of expors.stats
	}); //end of write file


} //end of compileCPP

exports.compileCPPWithInput = function ( envData , code , input ,  fn ) {
	var filename = cuid.slug();
	path = './temp/';

	//create temp0 
	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '.red + err);
			else
			{
				console.log('INFO: '.green + filename +'.cpp created');
				if(envData.cmd ==='g++')
				{

					//compile c code
					commmand = 'g++ ' + path + filename +'.cpp -o '+ path + filename+'.exe' ;
					exec(commmand , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
							}
							var out = { error : stderr };
							fn(out);
						}
						else
						{
							if(input){
								var inputfile = filename + 'input.txt';

								fs.writeFile( path  +  inputfile , input  , function(err ){
									if(exports.stats)
									{
										if(err)
											console.log('ERROR: '.red + err);
										else
											console.log('INFO: '.green + inputfile +' (inputfile) created');
									}
								});
								var progNotFinished=true;
								var tempcommand = "cd temp & " + filename ;

								exec( tempcommand + '<' + inputfile , function( error , stdout , stderr ){
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
												console.log('INFO: '.green + filename + '.cpp contained an error while executing');
											}
											var out = { error : stderr};
											fn(out);
										}
									}
									else
									{
										if(progNotFinished) {
											progNotFinished = false;
											if (exports.stats) {
												console.log('INFO: '.green + filename + '.cpp successfully compiled and executed !');
											}
											var out = {output: stdout};
											fn(out);
										}
									}
								});
								if(envData.options.timeout)
								{
									// kill the programme after envData.options.timeout ms
									setTimeout(function (){
										exec("taskkill /im "+filename+".exe /f > nul",function( error , stdout , stderr ){
											if(progNotFinished)
											{
												progNotFinished=false;// programme finished
												if(exports.stats)
												{
													console.log('INFO: '.green + filename + '.exe was killed after '+envData.options.timeout+'ms');
												}
												var out = { timeout : true};
												fn(out);
											}
										});
									},envData.options.timeout);
								}

							}
							else //input not provided
							{
								if(exports.stats)
								{
									console.log('INFO: '.green + 'Input mission for '+filename +'.cpp');
								}
								var out = { error : 'Input Missing' };
								fn(out);
							}

						}


					});

				}
				else if ( envData.cmd == 'gcc')
				{
					//compile c code
					commmand = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(commmand , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
							}
							var out = { error : stderr};
							fn(out);
						}
						else
						{
							if(input){
								var inputfile = filename + 'input.txt';

								fs.writeFile( path  +  inputfile , input  , function(err ){
									if(exports.stats)
									{
										if(err)
											console.log('ERROR: '.red + err);
										else
											console.log('INFO: '.green + inputfile +' (inputfile) created');
									}
								});

								exec( path + filename +'.out' + ' < ' + path + inputfile , function( error , stdout , stderr ){
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
												console.log('INFO: '.green + filename + '.cpp contained an error while executing');
											}
											var out =  { output : stderr};
											fn(out);
										}
									}
									else
									{
										if(exports.stats)
										{
											console.log('INFO: '.green + filename + '.cpp successfully compiled and executed !');
										}
										var out = { output : stdout};
										fn(out);
									}
								});

							}
							else //no input file
							{
								if(exports.stats)
								{
									console.log('INFO: '.green + 'Input mission for '+filename +'.cpp');
								}
								var out = { error : 'Input Missing' };
								fn(out);
							}
						}
					});
				}
				else
				{
					console.log('ERROR: '.red + 'choose either g++ or gcc ');
				}
			}	//end of else err
		}	//end of exports.stats
	});	//end of write file 							
} //end of compileCPPWithInput
