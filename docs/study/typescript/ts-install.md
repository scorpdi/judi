# 安装

> 介绍 TypeScript 环境的安装。

## npm 安装

全局安装

```
npm install -g typescript
```

安装完成后我们可以使用 tsc 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
$ tsc -v
Version 3.2.2
```

通常我们使用 .ts 作为 TypeScript 代码文件的扩展名。

然后执行以下命令将 TypeScript 转换为 JavaScript 代码：

```bash
tsc app.ts
```

![aa](/images/ts/2022-11-21-03.png)

`tsc`解析 ts 文件后会生成一个对应的 js 文件

TypeScript 转换为 JavaScript 过程如下图：

![aa](/images/ts/2022-11-21-04.png)
