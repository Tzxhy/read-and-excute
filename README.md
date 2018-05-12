# 项目简介
该工具用于解析命令行指令及参数。其具体格式为：command -instruct_1 param_1 param_2 -instruct_2 param_1 param_2。假设运行：
```javascript
node index.js -open chrome -config config.js // chrome为-open参数，config.js为-config参数
node index.js -o chrome -c config.js // chrome 为 -o参数，config.js为-config参数
node index.js -o -c config.js // -o使用默认配置
node index.js -o chrome firefox // -c使用默认配置，-o参数为chrome和firefox
```
即，一个指令可以对应于多个参数。
# 用法介绍
var Args = require('read-and-excute');

## 配置
```javascript
var customArgs = new Args({
    binName: '', // 可选，默认为'userBin'
    version: '', // 可选，默认为'1.0.0'
    commands: [], // 字符串数组，可选。可通过addCommand添加。
    commandsAndOptionsTips: '', // 可选，用于描述指令和选项
    descriptions: [], // 字符串数组，可选，用于描述指令的作用。可通过addCommand添加。
    options: [[]], // 字符串数组的数组，可选。可通过addOptions添加选项。
    realFunction: [], // commands对应的执行函数，可选。可通过addCommand添加。
    globalConfig: {}, // 全局配置，可选。
});
其中，commands、options、realFunction中的顺序一一对应。
globalConfig = {
    replaceCommandWhenAdd: false, // 默认为false, 表示不覆盖已有的command配置。若使用默认设置，当对已有command配置进行addCommand时会报错
}
```

## 添加指令
```javascript
/**
 * 添加一条指令
 * @param  {string} instruct 添加指令的字符串
 * @param  {string} description 添加指令的描述
 * @param  {function} callback 命中指令时的回调
 * @return {customArgs}     返回调用该方法的对象
 */
customArgs.addCommand(instruct, description, callback);
```

## 对已有或者尚未添加的指令添加选项
```javascript
/**
 * 添加选项
 * @param  {string} instruct 已存在或者未存在的指令
 * @param  {string|array} options 需要添加的选项
 * @return {customArgs}     返回调用该方法的对象
 */
customArgs.addOptions(instruct, options);
```

## 使用addConfig添加指令和选项
```javascript
/**
 * 添加指令和选项
 * @param  {string} instruct 已存在或者未存在的指令
 * @param  {string|array} options 需要添加的选项
 * @return {customArgs}     返回调用该方法的对象
 */
customArgs.addConfig(config);
config = {
    command: string,
    description: string,
    options: string[],
    callback: function
}
```


## 执行
```javascript
/**
 * 执行命令
 * @return {customArgs}     返回调用该方法的对象
 */
customArgs.excute();
```
执行回调时会将参数传入函数。如将['chrome', 'firefox']传入回调。


# 升级说明
## v1.0.1
修改了更为详细的注释。Args.addOptions添加了对字符串options的支持。
## v1.0.2
添加使用-help指令显示帮助文档。