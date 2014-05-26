compileX
========
compileX is a node.js library which is used to build online code editor/compiler websites and webservices.

You can compile and respond back outputs for all the languages that can be compiled by the server.

Some of the online code compiling/judging websites are 
<ul>
<li><a href="www.codepad.org">codepad</a></li>
<li><a href="www.ideone.com">ideone</a></li>
<li><a href="www.hackerrank.com">HackerRank</a></li>
<li><a href="www.codechef.com">CodeChef</a></li>
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
    <i><b>npm install compileX</b></i><br/>
    You can use the compileCPP and compileCPPWithInput methods to compile both C and C++ code. ( Refer Docs given below ).
    </li>
</ol>

<b>NOTE : create a directory named "temp" in your Project Dirctory.</b>This is where the users files are compiled and executed . You can/should use flush or flushSync method to clean it manually.


Documentation
=============
1)Require compileX 
```javascript
var compiler = require('compileX');
```
2)Compiling C and C++
```javascript
    //if windows  
	var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
	//else
	var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (output) {
    	res.send(output);
    });
```
3)Compiling C and C++ with inputs ( providing stdin )
```javascript
	var envData = { OS : "windows" , cmd : "g++"};	   
    compiler.compileCPPWithInput(envData , code , input , function (output) {
    	res.send(output);
    });
```
4)Memory Management 
```javascript
    compiler.flush(function(){
    console.log('All temporary files flushed !'); 
    });
```

```javascript
    compiler.flushSync();
```
