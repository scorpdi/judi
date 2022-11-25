# 基础语法

TypeScript 程序由以下几个部分组成：

- 模块
- 函数
- 变量
- 语句和表达式
- 注释

## TypeScript 程序

使用以下 TypeScript 程序来输出 "Hello World" ：

```ts
// Runoob.ts
const hello: string = "Hello World!";
console.log(hello);
```

以上代码首先通过 tsc 命令编译：

```
tsc Runoob.ts
```

得到如下 js 代码：

```js
// Runoob.js
var hello = "Hello World!";
console.log(hello);
```

最后我们使用 node 命令来执行该 js 代码。

```bash
$ node Runoob.js
// Hello World
```

整个流程如下图所示：
![05](/images/ts/2022-11-21-05.png)

我们可以同时编译多个 ts 文件：

```
tsc file1.ts file2.ts file3.ts
```
