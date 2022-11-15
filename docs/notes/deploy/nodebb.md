---
title: nodebb部署&开发记录
---

# nodebb部署&开发记录

##  常用参考查阅资料
[NodeBB 基础使用 & 开发](https://www.yuque.com/a632079/nodebb)
[NodeBB官方文档](https://docs.nodebb.org/)

## 数据库mongo
使用docker安装mongodb，方便快捷
```bash
## 命令行记录
# 拉取镜像
docker pull mongo

# 查看镜像是否下载成功
docker images

# 创建数据库挂载文件,在data/mongo文件目录下新建data logs conf文件夹，
cd /data/
mkdir mongo
cd mongo 
mkdir data logs conf
chmod 777 data
touch logs/mongod.log
chmod 777 logs/mongod.log
touch conf/mongod.conf
chmod 766 conf/mongod.conf

# 运行mongo
docker run -itd --name mongodb --restart=always --privileged -p 27017:27017 -v /data/mongo/data:/data/db -v /data/mongo/conf:/data/configdb -v /data/mongo/logs:/data/log/ mongo:latest -f /data/configdb/mongod.conf
# --restart=always Docker服务重启容器也启动
# --privileged 拥有真正的root权限
# -f 指定配置文件

```
访问服务器的27017端口如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/18fa63c7fa8b4695861ff8a94a4aed96.png)
### 创建数据库root账号
mongo默认安装的数据是不需要登录就可以访问的。直接通过docker访问mongo容器中访问admin添加管理员。
```bash
#进入容器
docker exec -it mongo /bin/bash
#登录mobodb
mongo admin

```
但是我这边不知道什么原因一直不能在容器中使用mongo命令。所以我使用可视化工具去登录mongo。[mongodb-compass](https://www.mongodb.com/try/download/compass)
![在这里插入图片描述](https://img-blog.csdnimg.cn/d2a96ab53d6c4380add6c27dfc4dc0ae.png)
因为还没有设置数据库账号密码登录的限制，使用mongodb-compass只要填写一下数据库路径端口就可以直接连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/455c2f7f36034c319285fd906c712b5b.png)
登录成功之后选中默认的admin，点击左下角的命令行工具
![在这里插入图片描述](https://img-blog.csdnimg.cn/6a21f5ca4d114590b64a118a92b67aa4.png)
```bash
use admin
## 创建root账号
db.createUser({user:'root',pwd:'tiger',roles:['root']})
```
### 修改数据库登录方式
修改数据库挂载文件夹/data/mongo/conf下的配置文件
```
# 数据库文件存储位置
dbpath = /data/db
# log文件存储位置
logpath = /data/log/mongod.log
# 使用追加的方式写日志
logappend = true
# 是否以守护进程方式运行
# fork = true
# 全部ip可以访问
bind_ip = 0.0.0.0
# 端口号
port = 27017
# 是否启用认证
auth = true
# 设置oplog的大小(MB)
oplogSize=2048
```
设置成功之后使用docker命令重启一下mongo容器就好了

### 参考文章
[docker中安装mongo](https://blog.csdn.net/qq_38058332/article/details/124583422)

## nodebb运行&主题开发
通过文档阅读，如果想要使用自己的论坛界面，我们使用nodebb的主题开发方式来改造系统是最优的解决方案。~~代码带多了~~ 。使用pnpm搭建Monorepo工程来管理本项目
```bash
├── packages
|   ├── NodeBB
|   |   ├── package.json
|   ├── nodebb-theme-quickstart
|   |   ├── package.json
├── package.json
```
主题直接使用nodebb轮子项目改个 名字就好
[NodeBB官方快速开发轮子](https://github.com/NodeBB/nodebb-theme-quickstart)
[NodeBB-China快速开发轮子](https://github.com/NodeBB-China/nodebb-theme-quickstart)
或者直接下载主题修改名字再开始开发
[nodebb-theme-persona](https://github.com/NodeBB/nodebb-theme-persona)

最后开发好的主题包发布到npm上使用
### 问题记录

 1. 主题开发中如何添加新页面
答：需要在项目中新建route，controller，template
 2. 待完善

### nodebb命令行记录
```bash
# 初始化项目
./nodebb setup
# 启动项目
./nodebb start
# 关闭项目
./nodebb stop
# 重启
./nodebb restart
# 重新构建 (JS, CSS, templates, languages)
./nodebb build
# 初始化 plugins, themes, settings, etc
./nodebb reset [options]
# 更多命令行查询
./nodebb help
```

## nodebb 使用docker部署
将项目代码clone到服务器上，在nodebb项目目录下执行初始化设置
nodebb自带的dockerfile已经有了现成的配置（自行修改），只要在NodeBB目录下执行镜像构建命令。
```bash
./nodebb setup
# 初始化设置成功之后
# 构建镜像
docker build --rm -t nodebb .
# 运行容器
docker run -d -p 4567:4567 --name nodebb nodebb
```
设置管理员账号之后，登录到设置页面，选中自己开发的主题，重构重启之后可以看到自己开发的主题了。

附上我的论坛：
[我的bbs论坛](http://bbs.scorp.fun/)

