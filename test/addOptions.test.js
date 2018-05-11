var Args = require('../src/index.js');

var argsTest = new Args();

argsTest.addCommand('add1', 'madksjfefs', function(){console.log('test')})
argsTest.addOptions('add1', ['chrome', 'firefox']);
argsTest.addOptions('add2', ['chrome', 'firefox']);

console.log(argsTest);