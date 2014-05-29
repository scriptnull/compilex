var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');

exports.init = function(){
	fs.exists( './temp' , function(exists){		
		    if(!exists)
		    {		    	
		    	fs.mkdirSync('./temp');
		    }
	});
}


exports.compileCPP = function ( envData ,  code , fn ) { 

	       if(envData.OS === 'windows' || envData.cmd === 'g++')
	       {
	        var filename = cuid.slug();
			path = './temp/';
			 			 

			//create temp0 
 			fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
			console.log(err);
			});

			//compile c code 
			commmand = 'g++ ' + path + filename +'.cpp -o '+path + filename +'.exe' ;
			exec(commmand , function ( error , stdout , stderr ){  
				if(error)
				{
					fn(stderr);
				}
				else
				{
				    var tempcommand = "cd temp & "+ filename ;
					exec( tempcommand , function ( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
		    		});

				}
			

			});


	       }  
	       else 
	       {
	        var filename = cuid.slug();
			path = './temp/';
			 			 

			//create temp0 
 			fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
			console.log(err);
			});

			//compile c code 
			commmand = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
			exec(commmand , function ( error , stdout , stderr ){  
				if(error)
				{
					fn(stderr);
				}
				else
				{
					exec( path + filename + '.out', function ( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
		    		});

				}
			

			});

	       }	    								
} //end of compileCPP


exports.compileCPPWithInput = function ( envData , code , input ,  fn ) { 

	    
	        var filename = cuid.slug();
			path = './temp/';
			 			 

			//create temp0 
 			fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
 				if(err)
      			   console.log(err);
			});

		if(envData.OS === 'windows' || envData.cmd ==='g++')
	    {	    	    

			//compile c code 
			commmand = 'g++ ' + path + filename +'.cpp -o '+ path + filename+'.exe' ;
			exec(commmand , function ( error , stdout , stderr ){  
				if(error)
				{
					fn(stderr);
				}
				else
				{
					if(input){
						var inputfile = filename + 'input.txt';

						fs.writeFile( path  +  inputfile , input  , function(err ){
							if(err)
								console.log(err);
			            });
			            var tempcommand = "cd temp & " + filename ;

						exec( tempcommand + '<' + inputfile , function( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
						});

					}else
					{
						exec( filename, function ( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
		    		});

					}
					
				}
			

			});
	    								
	    }
	    else	    	
	    {
	    				//compile c code 
			commmand = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
			exec(commmand , function ( error , stdout , stderr ){  
				if(error)
				{
					fn(stderr);
				}
				else
				{
					if(input){
						var inputfile = filename + 'input.txt';

						fs.writeFile( path  +  inputfile , input  , function(err ){
							if(err)
								console.log(err);
			            });



						exec( path + filename +'.out' + ' < ' + path + inputfile , function( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
						});

					}else
					{
						exec( filename, function ( error , stdout , stderr ){
						if(error)
							fn(stderr);
						else
							fn(stdout);
		    		});

					}
					
				}
			

			});


	    }								
} //end of compileCPPWithInput

exports.flushSync = function() {
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

