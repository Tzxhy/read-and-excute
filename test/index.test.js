var Args = require('../src/index.js');

var argsTest = new Args({
    binName: 'test',
    version: '1.0.1',
});

argsTest.addCommand('show', 'show test description', function(param){
    console.log('param is:', param);
    console.log('show in callback!');
});
argsTest.addOptions('show', ['chrome', 'firefox']);
argsTest.addCommand('test', 'show test description', function(param){
    console.log('param is:', param);
    console.log('test in callback!');
});
argsTest.addOptions('test', ['chrome', 'firefox']);
argsTest.showHelp();

argsTest.excute();