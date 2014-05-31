compileX
========
compileX is a node.js library which is used to build online code editor/compiler websites and webservices.

You can compile and respond back outputs for all the languages that can be compiled by the server.

Some of the online code compiling/judging websites are 
<ul>
<li><a href="http://www.codepad.org">codepad</a></li>
<li><a href="http://www.ideone.com">ideone</a></li>
<li><a href="http://www.hackerrank.com">HackerRank</a></li>
<li><a href="http://www.codechef.com">CodeChef</a></li>
</ul>
Using compileX , you can built sites and services like the above said examples.



Work Flow
=========
1)Get the program as input from the client as a request<br/>
2)Use compileX modules to compile the program <br/>
3)Get the output as String<br/>
4)Respond the output to the client<br/>

Mandatory Steps 
===============
Inorder to compile any programming language , you need to first have the compiler for that programming language in the server machine.

The beta version of compileX supports the compilation of C and C++ only . I am sure that you could expect the successive builds with more programming languages added. I also look forward for some contributions to the repo.So feel free to play with compileX

<h4>Compiling C and C++</h4>
<ol>
<li><b>Installation :</b>You need GCC compiler that can compile programs from your cmd/terminal
    <ul>
    <li>Windows - You can get <a href="http://www.mingw.org/">MinGw</a> . </li>
    <li>Linux - Most of the linux versions are installed with gcc by default. If you haven't got , Take a look at <a href="http://gcc.gnu.org/wiki/InstallingGCC">Installing GCC</a> . </li>
    </ul>
</li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing the GCC command lines from any directory
    <ul>
    <li>Windows - create a c file in a directory , execute <br/> 
    <i><b>g++ filename.c -o output.exe<br/>
    output.exe</b></i><br/>
    then you will get the output of the program</li>
    <li>Linux - create a c file in a directory , execute <br/>
    <i><b>gcc filename.c -o output.out<br/>
    ./output.out</b></i><br />
    then you will get the output of the program</li>
    </ul>
<li><b>Jump Start : </b> get compileX via npm <br/>
    <i><b>npm install compilex</b></i><br/>
    </li>
</ol>


Documentation
=============
<h5>1)Require compileX </h5>
```javascript
var compiler = require('compilex');
compiler.init();
```
init() creates a folder named temp in your project directory which is used for storage purpose.
Before using other methods , make sure to call init() method.

<h5>2)Compiling C and C++ </h5>
```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (output) {
    	res.send(output);
    });
    
    //res is the response object
```

<h5>3)Compiling C and C++ with inputs ( providing stdin ) </h5>
```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPPWithInput(envData , code , input , function (output) {
    	res.send(output);
    });
    
    //res is the response object
```

<h5>4)Memory Management </h5>
All the temporary files ( source code and executables ) are created in your temp directory.
flush and flushSync helps you to free the memory by deleting the temporary files.
```javascript
    compiler.flush(function(){
    console.log('All temporary files flushed !'); 
    });
```
Synchronous version of flush
```javascript
    compiler.flushSync();
```
Examples
========
You can find examples <a href="examples">here</a>.The examples are downloaded everytime you download compileX via npm.
you can begin with editing CSS and publish your site in minutes.

License
=======
All the contents in this repository are released under the <a href="https://github.com/scriptnull/compileX/blob/master/License.md">MIT License</a> .
