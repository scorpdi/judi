
## 代码注释风格相关

> 代码注释使用[jsdoc](http://yuri4ever.github.io/jsdoc/#@file)风格，本章记录较为常用的注释模板，详情请自行阅读[jsdoc指南](http://yuri4ever.github.io/jsdoc/#@file)

jsdoc常用定义类型如下

- @file   -  文件注释
- @func  - 函数方法注释
- @var  - 变量注释
- @constant - 常量注释
- @class  - 类注释
- @member - 类的属性注释
- @enum - 枚举注释
### 单行注释

- 双斜杠(//)后空一格
- 代码后注释时还需要在双斜杠前空一格
```javascript
// 调用一个方法，xxx
getTitle()
let maxCount = 10; // 设置最大量
```
### 多行注释

- 三行内的注释请使用单行注释，超过三行的注释使用多行注释
- 多行注释尽量第一行和最后一行都留空
- 每行第一个字到*都空一格
```javascript
/*
* 函数说明
* @...
* ...
*/
```
### 函数方法注释
```javascript
/**
 * @func
 * @desc 一个带若干参数的函数
 * @param {...string} a - 参数a
 * @param {boolean} b - 参数布尔值b
 * @param {array} c - 参数数组b
 * @return {boolean} - 返回布尔值
 */
function bar(a,b) {
  return true
}
```

### 文件注释
在文件头部使用
```javascript
 /**
  * @file 文件的名称
  * @desc 文件的详细描述
  * @author zhangdi
  * @createDate 2017-10-16 09:40:11
  */
```
### 变量注释
将关键的变量进行特殊注释，生成到文档中
```javascript
/**
 * @var {object}
 * @desc 变量定义
 * @property {string} a 属性a
 * @property {string} b 属性b
 */
var foo = {
    a: 'a',
    b: 'b'
}
```
### 类的注释
```javascript
/**
 * @class
 * @classdesc 这是对myClass类的描述
 * @desc 这是对myClass类的构造函数的描述
 */
function myClass() {
    ...
}

// 类的属性注释
var LBSControllerCom = Com.extends({
    /**
     * @member {string}
     * @desc 这样标识类的属性
     */
    foo1 : 'a',
    init: function() {}
})
```
### 枚举注释
```javascript
/**
 * @enum {number}
 * @desc cgi常见的返回码
 */
var RETCODE = {
    /**
     * @desc 未登录
     */
    NOT_LOGIN: 100000,
    /**
     * @desc 参数错误
     */
    PARAM_ERROR: 100001,
    /**
     * @type {string}
     * @desc 未知错误
     */
    UNKOWN_ERROR: 'unkown'
}
```
### vscode 快捷代码注释配置模板使用
> vscode支持自定义代码配置，配置基础模板到自己的vscode
> 快捷键`command p`
> `> 配置用户代码片段`

javascript.json模板

```json
{
	// Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"Print to js file": {
		"prefix": "@jsfile",
		"body": [
			"/** ",
			" *",
			" * @file",
			" * @desc ",
			" * @author zhangdi ",
			" * @date ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} ",
			"**/"
		],
		"description": "js头部文件注释模板"
	},
	"Print to js func": {
		"prefix": "@jsfunc",
		"body": [
			"/** ",
			" *",
			" * @func",
			" * @desc ",
			" * @author zhangdi ",
			" * @date ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} ",
			"**/"
		],
		"description": "js函数注释模板"
	},
	"Print to js class": {
		"prefix": "@jsclass",
		"body": [
			"/** ",
			" *",
			" * @class",
			" * @desc ",
			" * @author zhangdi ",
			" * @date ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} ",
			"**/"
		],
		"description": "js类注释模板"
	}
}
```
