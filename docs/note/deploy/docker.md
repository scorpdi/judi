---
title: docer相关使用记录
---

# 关于使用docker的记录

## docker安装
> 记录系统配置：CentOS  8.4 64位

```bash
# 升级yum
sudo yum update
#安装yum 需要用到的包。yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
sudo yum install -y yum-utils device-mapper-persistent-data lvm2


# 卸载旧版本
sudo yum remove docker  docker-common docker-selinux docker-engine 
# 设置源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 安装docker
yum -y install docker-ce


# 启动docker
sudo systemctl start docker

# 设置开机启动docker
sudo systemctl enable docker

# 查看是否安装成功
docker verion

```

## nginx 安装

```bash
# docker 查找nginx版本
docker search nginx

# 安装最新版本
docker pull nginx:latest

```
安装成功之后配置nginx映射文件

启动一个测试端口，拷贝Nginx文件目录
```bash
# 新建文件目录，新建在mnt文件夹下
mkdir -p /mnt/nginx/conf
mkdir -p /mnt/nginx/logs
mkdir -p /mnt/nginx/html
mkdir -p /mnt/nginx/conf.d

# 拷贝Nginx文件目录中的文件
docker cp b2203b3073c1:/etc/nginx/nginx.conf  /mnt/nginx/conf/
docker cp b2203b3073c1:/etc/nginx/conf.d/default.conf /mnt/nginx/conf.d/default.conf

# 启动nginx服务，映射到/mnt/nginx目录下
docker run --name nginx --privileged -it -p 8080:80 -v /mnt/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro -v /mnt/nginx/conf.d:/etc/nginx/conf.d:ro -v /mnt/nginx/html:/usr/share/nginx/html:rw  -v /mnt/nginx/logs:/var/log/nginx -d nginx

```

## nodejs安装

```bash

# 安装最新的nodejs
docker pull node

# 查看node版本
docker run -it --rm node node --version

```
## node项目部署
创建Dockerfile文件,暴露3000端口
```bash
FROM node

RUN mkdir -p /home/Service
WORKDIR /home/Service

COPY . /home/Service
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
```

构建镜像
```BASH
# 通过该命令，按照 Dockerfile 所配置的信息构建出镜像
  # -t 镜像的名称
  # --rm 构建成功后，删除临时镜像（每执行一行 Dockerfile 中的命令，就会创建一个临时镜像）
  docker build --rm -t node-hello .
  # 查看是否生成镜像
  docker images
  
# 启动镜像
run -d -p 3000:3000 --name nodejs1 node-hello

# 访问服务器的3000端口验证是否成功
```

