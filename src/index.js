var colorConfig = require('./config/color.config.js');
var globalConfig = require('./config/global.config.js');


function Args(config) {
    var config = config || {};
    this.binName = config.binName || 'userBin';
    this.version = config.version || '1.0.0';
    this.commandsAndOptionsTips = config.commandsAndOptionsTips || '';
    this._commandsLine = process.argv.slice(2);
    this.commands = config.commands || [];
    this.descriptions = config.descriptions || [];
    this.options = config.options || [];
    this.callbacks = config.realFunction || [];
    this.globalConfig = config.globalConfig || globalConfig;
}


Args.prototype.parse = function() {
    var parsedParam = {};
    var tempCommandsLine = this._commandsLine;
    var lastCommand = '';
    for (var i = 0, j = 0, len = tempCommandsLine.length; i < len; ++i) {
        if (tempCommandsLine[i][0] === '-') {
            j = i;
            lastCommand = tempCommandsLine[j].slice(1);
            parsedParam[lastCommand] = [];
        } else {
            parsedParam[lastCommand].push(tempCommandsLine[i]);
        }
    }
    return parsedParam;
}

Args.prototype.addCommand = function(instruct, description, callback) {
    var index = this.commands.indexOf(instruct);
    // 新增一条指令
    if (index === -1) {
        this.commands.push(instruct);
        this.descriptions.push(description);
        this.callbacks.push(callback);
    } else {
        if (this.globalConfig.replaceCommandWhenAdd) {
            this.descriptions[index] = description;
            this.callbacks[index] = callback;
        } else {
            throw new Error('Found a existed command when use addCommand, and you set globalConfig.replaceCommandWhenAdd false!');
        }
    }
    return this;
}

Args.prototype.addOptions = function(instruct, options) {
    if (!Array.isArray(options)) {
        options = [options];
    }
    var index = this.commands.indexOf(instruct);
    if (index === -1) {
        throw new Error('No command found named ' + instruct + ' when using addOptions.');
    } else {
        var tempOptions = this.options[index] = [];
        options.forEach(function(item, index) {
            tempOptions.push(item);
        });
    }
    return this;
}
Args.prototype.showHelp = function() {
    console.log(this.binName + ' version: ' + this.version);
    console.log('Usage:');
    console.log('\t-command\t[params]');
    console.log();
    console.log('Commands and Options:');
    console.log('\t' + this.commandsAndOptionsTips);
    var tempCommands = this.commands;
    var tempDescriptions = this.descriptions;
    for (var i = 0, len = tempCommands.length; i < len; ++i) {
        console.log('\t-' + tempCommands[i] + '\t' + tempDescriptions[i]);
        this.options[i].forEach(function(item, index) {
            console.log('\t\t' + item);
        });
    }
}

/*
config = {
    command: string,
    description: '',
    options: [],
    callback: function
}
*/

Args.prototype.addConfig = function(config) {
    if (!config.command || !config.callback) {
        throw new Error('Can not apply config to read-and-excute when config.command or config.callback is undefined!')
    }
    this.addCommand(config.command, config.description, config.callback);
    this.addOptions(config.command, config.options);
    return this;
}

Args.prototype.excute = function(config) {
    var parsedParam = this.parse();
    var tempFuns = this.callbacks;
    var tempCommands = this.commands;
    for (var i in parsedParam) {
        var index = tempCommands.indexOf(i);
        if (index !== -1) {
            var tempFun = tempFuns[index];
            tempFun.call(null, parsedParam[i]);
        } else {
            console.log('error: your command "'+ i + '" is not valid, you may forget to register it.');
        }
    }
}


module.exports = Args;