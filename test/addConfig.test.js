var Args = require('../src/index.js');

var argsTest = new Args({
    binName: 'test',
    version: '1.0.1',
});

argsTest.addConfig({
    command: 'show',
    description: 'show show show',
    options: ['chrome', 'firefox'],
    callback: function(param) {
        console.log('param is:', param);
        console.log('show in callback!'); 
    }
});

argsTest.showHelp();

argsTest.excute();