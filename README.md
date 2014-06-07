<h1>compilex</h1>
[![NPM version](https://badge.fury.io/js/compilex.svg)](http://badge.fury.io/js/compilex)
[![Build Status](https://travis-ci.org/scriptnull/compilex.svg?branch=master)](https://travis-ci.org/scriptnull/compilex)
[![Dependency Status](https://david-dm.org/scriptnull/compilex.svg)](https://david-dm.org/scriptnull/compilex)
[![Download Status](http://img.shields.io/npm/dm/compilex.svg)](https://www.npmjs.org/package/compilex)
[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/scriptnull/compilex/blob/master/License.md)


compilex is a node.js library which is used to build online code editor/compiler websites and webservices.

You can compile and respond back outputs for all the languages that can be compiled by the server.

Some of the online code compiling/judging websites are 
<ul>
<li><a href="http://www.codepad.org">codepad</a></li>
<li><a href="http://www.ideone.com">ideone</a></li>
<li><a href="http://www.hackerrank.com">HackerRank</a></li>
<li><a href="http://www.codechef.com">CodeChef</a></li>
</ul>
Using compilex , you can built sites and services like the above said examples.

Why compilex ?
=============
1) It is the one and only library implmenting the online compiler concept. <br/>
2) compilex can detect infinite loops in the users program . <br/>
3) It can compile programs by getting input from STDIN and from command line arguments. <br/>
4) Generates statistics for the administrator. <br />
5) Will include more supporting functions in the future releases.

Supported Languages 
===================
compilex is currently in initial development stage . As the library grows , so does the list here .

| Language | Support |
|---------|:-------:|
|C |&#x2714;|
|C++ | &#x2714; |
|Java | &#x2714; |
|Python | &#x2714; |
|C# | Available Soon |
|Visual Basic | Available Soon |
|Ruby | Availlable Soon |
|JavaScript | Available Soon |
|PHP | Available Soon |
|Perl | Available Soon |
|Lua | Available Soon |
|Haskell| Available Soon |
|Other Languages | Available Later |

compilex roles out updates more frequently.Days are not so far , you can see the above languages soon.

Work Flow
=========
1) Get the program as input from the client as a request<br/>
2) Use compilex modules to compile the program <br/>
3) Get the output and errors in json and string formats <br/>
4) Respond the output to the client<br/>

Setting Up Compilers 
====================
Inorder to compile any programming language , you need to first have the compiler for that programming language in the server machine.

<h4>C and C++</h4>
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
</ol>

<h4>Java</h4>
<ol>
<li><b>Installion :</b> You need JDK ( Java Development Kit ) to compile Java programs.Click <a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html"> here </a> to download JDK for various platforms.</li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing the javac command lines from any directory
<ul>
<li>Create a Java file named Main.java with main function<br/>
<i><b>javac Main.java <br />
java Main </b></i><br/>
then you will get the output of the program.
</li>
</ul>
</ol>

<h4>Python</h4>
<ol>
<li><b>Installation :</b> You can get and install Python from <a href="https://www.python.org/download/"> here </a></li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing python command lines from any directory
<ul>
<li>Create a python file hello.py and execute <br/>
<i><b>python hello.py</b></i><br/>
then you will get the output of the program.
</li>
</ul>
</ol>


Documentation
=============
<h5>1)Require compilex </h5>
```javascript
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
```
init() creates a folder named temp in your project directory which is used for storage purpose.
Before using other methods , make sure to call init() method.

<h5>2)C and C++ </h5>
```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (data) {
        res.send(data);
        //data.error = error message 
        //data.output = output value
    });
    
    //res is the response object
```

<h5>3)C and C++ with inputs </h5>
```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPPWithInput(envData , code , input , function (data) {
        res.send(data);
    });
```

<h5>4)Java</h5>
```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; // (Support for Linux in Next version)
    compiler.compileJava( envData , code , function(data){
        res.send(data);
    });    
```

<h5>5)Java with inputs</h5>
```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; // (Support for Linux in Next version)
    compiler.compileJavaWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```
<h5>6)Python</h5>
```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; 
    compiler.compilePython( envData , code , function(data){
        res.send(data);
    });    
```

<h5>7)Python with inputs</h5>
```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; 
    compiler.compilePythonWithInput( envData , code , input ,  function(data){
        res.send(data);        
    });
```



<h5>8)Memory Management </h5>
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

<h5>9)Statistical Data</h5>
Getting statistics about your compilex server has been taken care.
fullStat returns json data about your server.
```javascript
    compiler.fullStat(function(data){
        res.send(data);
    });
```

Examples
========
You can find examples <a href="examples">here</a>.The examples are downloaded everytime you download compilex via npm.
you can begin with editing CSS and publish your site in minutes.
Here is the screenshot of the demo.
<br />
<br />
![alt text](https://github.com/scriptnull/compileX/raw/master/DemoPicture.png "Screenshot image.")

License
=======
All the contents in this repository are released under the <a href="https://github.com/scriptnull/compilex/blob/master/License.md">MIT License</a> .

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/scriptnull/)

