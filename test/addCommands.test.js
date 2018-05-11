var Args = require('../src/index.js');

var argsTest = new Args();

argsTest.addCommand('add1', 'madksjfefs', function(){console.log('test')})
argsTest.addCommand('add2', '222222', function(){console.log('test')})

console.log(argsTest);