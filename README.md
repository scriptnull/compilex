# compilex 
[![NPM version](https://badge.fury.io/js/compilex.svg)](http://badge.fury.io/js/compilex)
[![Build Status](https://travis-ci.org/scriptnull/compilex.svg?branch=master)](https://travis-ci.org/scriptnull/compilex)
[![Dependency Status](https://david-dm.org/scriptnull/compilex.svg)](https://david-dm.org/scriptnull/compilex)
[![Download Status](http://img.shields.io/npm/dm/compilex.svg)](https://www.npmjs.org/package/compilex)
[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/scriptnull/compilex/blob/master/License.md)
[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/scriptnull/compilex?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> This package is __DEPRECATED__. Please read the [deprecation notice](https://github.com/scriptnull/compilex/blob/master/README.md#deprecation-notice).

compilex is a node.js library which is used to build online code compiler/interpreter websites and webservices.

You can compile and respond back outputs for all the languages that can be compiled by the server.

Some of the online code compiling/judging websites are 
<ul>
<li><a href="http://www.codepad.org">codepad</a></li>
<li><a href="http://www.ideone.com">ideone</a></li>
<li><a href="http://www.hackerrank.com">HackerRank</a></li>
<li><a href="http://www.codechef.com">CodeChef</a></li>
</ul>
Using compilex , you can built sites and services like the above said examples.

compilex is an experimental package , however , if you want to build your site quickly , you can prefer to use the API of the above said services. Node.js Wrapper modules for those API are available. You can try [HackerRank SDK](https://github.com/scriptnull/machinepack-hackerrank) and [HackerEarth SDK](https://github.com/scriptnull/he-sdk-nodejs). 

Typical scenarios in which you have to go with wrapper modules instead of compilex are 
- If you don't want to have the pain of configuring compilers on your server. 
- If you don't have the access to the VM on which your site is hosted 
- If you feel tired of configuring compilex over SSH.

# Deprecation Notice
`compilex` is not under active development. It started as an experiment and served its purpose well. But over the time, new technologies like [docker](https://www.docker.com/) emerged. The existence of such technology and [nature of node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) prove that compilex would not scale well and be production ready with its current state.

Before a production ready rewrite of architecture and code, I considered looking at already existing solutions, which seem to be powerful enough to make me not to rewrite compilex. Here are they,

#### APIs
There are serveral battle tested APIs, that can help compile code online without the hassle of configuration and infrastructure. Some of them are
- [Hackerrank API](https://www.hackerrank.com/api)
- [Hackerearth API](https://www.hackerearth.com/docs/api/developers/code/legacy/)
- and many more.

#### Container Based Solution
[Docker containers](https://www.docker.com/) prove to be best fit for running code in an isolated environment ensuring security. Instead of rolling out compilex on the server itself, it would be more sensible to run compilex inside a docker container. For that to happen, we will be needing to build docker images for each language and their versions. 

Luckily, there is already a well managed and [open source solution](https://github.com/prasmussen/glot) called [glot.io](https://glot.io/). It seems to be one stop solution which includes web editor, docker based code runner, more language suppport and production ready. So, I highly recommend looking at [glot.io](https://glot.io/), if the intention is to run a code compiling service on your own infrastructure.

#### Steps forward
- compilex won't be unpublished from npm. This is to ensure that, projects using compilex is not affected.
- No PRs will be merged, except bug fixes. compilex will never reach 1.x.x version ( how sad :( ). This is to enforce people to use alternate solutions ( right solutions ) mentioned above.

> "I thank people for their responses and support over mail, gitter, quora etc." - [scriptnull](https://twitter.com/scriptnull)

Supported Languages 
===================
compilex is currently in initial development stage . As the library grows , so does the list here .

| Language | Support |
|---------|:-------:|
|C |&#x2714;|
|C++ | &#x2714; |
|Java | &#x2714; |
|Python | &#x2714; |
|C# | &#x2714; |
|Visual Basic | &#x2714; |

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

<h4>C# and VB </h4>
<ol>
<li><b>Installation :</b> You can have the idea of accessing C# compiler from <a href="http://msdn.microsoft.com/en-us/library/ms379563(v=vs.80).aspx"> here </a> . This step also adds VB compiler to the scope automatically as csc and vbc are located in the same directory </li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing C# and VB command lines from any directory
<ul>
<li>Create a C# or VB file Hello.cs or Hello.vb and execute <br/>
<i><b>csc Hello.cs <br/>
     Hello.exe
</b></i><br/>
or <br />
<i><b>vbc Hello.vb <br/>
     Hello.exe
</b></i><br/>
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
<h5>8)C#</h5>

```javascript
    var envData = { OS : "windows"}; 
    //mono modules for linux is not included till now
    compiler.compileCS( envData , code , function(data){
        res.send(data);
    });    
```

<h5>9)C# with inputs</h5>

```javascript

    var envData = { OS : "windows"}; 
    //mono modules for linux is not included till now
    compiler.compileCSWithInput( envData , code , input ,  function(data){
        res.send(data);        
    });
```
<h5>10)Visual Basic</h5>

```javascript
    var envData = { OS : "windows"}; 
    compiler.compileVB( envData , code , function(data){
        res.send(data);
    });    
```

<h5>11)Visual Basic with inputs</h5>

```javascript

    var envData = { OS : "windows"}; 
    compiler.compileVBWithInput( envData , code , input ,  function(data){
        res.send(data);        
    });
```

<h5>12)Memory Management </h5>

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

<h5>13)Statistical Data</h5>

Getting statistics about your compilex server has been taken care.
fullStat returns json data about your server.
```javascript
    compiler.fullStat(function(data){
        res.send(data);
    });
```
<h5>1)options : (windows only c/c++ only)</h5>
timeout: number of milliseconds to wait before killing the compiled program
```javascript
    //compile and execute the file and kill it after 1 second if it still running
    var envData = { OS : "linux" , cmd : "gcc" ,options: {timeout:1000 } };
    compiler.compileCPP(envData , code , function (data) {
        res.send(data);
        //data.error = error message 
        //data.output = output value
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

