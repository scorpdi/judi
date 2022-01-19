---
title: gitlab离线部署记录
---
# 记录gitlab仓库搭建。

## 介绍

GitLab 是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的web服务。可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。团队成员可以利用内置的简单聊天程序(Wall)进行交流。它还提供一个代码片段收集功能可以轻松实现代码复用。

## 离线下载rpm包

Gitlab的rpm包集成了它需要的软件，简化了安装步骤，所以直接安装rpm包即可，rpm包的获取从官方网站或者国内镜像源

> gitlab rpm下载地址：[(清华大学开源软件镜像站点)](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/) 。

## 前期准备环境


> 注：gitlab系统要求2G内存以上，不然可能会500报错
```bash
# 使用阿里云作加速
cd /etc/yum.repos.d/ 
mkdir bak
mv *.repo ./bak
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

```



## 环境依赖包安装及防火墙配置

```bash
# 安装依赖包
yum install -y pygpgme yum-utils
yum install -y curl policycoreutils-python openssh-server
yum install -y git

# 防火墙永久开启http
firewall-cmd --permanent --add-service=http
systemctl reload firewalld

# 安装postfix邮件服务
yum install postfix
systemctl enable postfix
systemctl start postfix
```

## 安装gitlab并启动服务

```bash
# 安装rpm 包
cd /tmp
rpm -ivh gitlab-ce-11.4.5-ce.0.el7.x86_64.rpm

# gitlab预配置
vi /etc/gitlab/gitlab.rb
# 找到并修改external_url 'http://gitlab.example.com'
external_url 'http://服务器IP'

# 自动配置gitlab
gitlab-ctl reconfigure

# 启动所有服务
gitlab-ctl start 

```

## gitlab数据库连接外部
> 
> 由于我们服务器已经有了数据库，所以需要停用gitlab自带的postgresql.
> 配置方式如下
>
```bash
# 数据库配置
gitlab_rails['db_adapter'] = "postgresql"
gitlab_rails['db_encoding'] = 'utf8'

postgresql['enable'] = false
gitlab_rails['db_database'] = "dbname"
gitlab_rails['db_host'] = 'ip'
gitlab_rails['db_port'] = '5432'
#上个步骤创建的用户
gitlab_rails['db_username'] = 'name'
gitlab_rails['db_password'] = '**********'

```
## gitlab 关闭自带的nginx服务配置

```bash

```
## 邮件发送配置
```bash

gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "1065615359@qq.com"
gitlab_rails['smtp_password'] = "********" # qq邮箱smtp生成密码，不是登录密码
gitlab_rails['smtp_domain'] = "smtp.qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_from'] = "1065615359@qq.com"
gitlab_rails['gitlab_email_reply_to'] = '1065615359@qq.com'
gitlab_rails['smtp_openssl_verify_mode'] = 'none'

```





## 汉化

> 虚拟机上试验了汉化补丁，发现汉化没有多大的意义，还不如原始的英文版本好看

```bash
# 查看gitlab版本
cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
git clone https://gitlab.com/xhang/gitlab.git
cd gitlab/
## 生成补丁
git diff v10.0.2 v10.0.2-zh > ../10.0.2-zh.diff
# 打补丁
patch -d /opt/gitlab/embedded/service/gitlab-rails -p1 < 10.0.2-zh.diff   #不停回车

```

## 备份&还原
```bash
# 设置配置文件
vim /etc/gitlab/gitlab.rb
gitlab_rails['manage_backup_path'] = true
gitlab_rails['backup_path'] = "/data/gitlab/backups"    //gitlab备份目录
gitlab_rails['backup_archive_permissions'] = 0644       //生成的备份文件权限
gitlab_rails['backup_keep_time'] = 7776000              //备份保留天数为3个月（即90天，这里是7776000秒）

# 生成备份文件夹 
mkdir -p /data/gitlab/backups
chown -R git.git /data/gitlab/backups
chmod -R 777 /data/gitlab/backups
  
如上设置了gitlab备份目录路径为/data/gitlab/backups，最后使用下面命令重载gitlab配置文件，是上述修改生效！
gitlab-ctl reconfigure

gitlab-ctl restart

gitlab-rake gitlab:backup:create

# 还原 吧备份文件cp到设置的备份目录下
gitlab-rake gitlab:backup:restore BACKUP=1528446365_2018_06_08_10.8.4
# 恢复命令：gitlab-rake gitlab:backup:restore BACKUP=备份文件时间戳，恢复的时候如果版本不一致，可能报错

```


## gitlab 维护管理常用命令行记录

```bash
# 生成配置启动服务(重新加载配置文件/etc/gitlab/gitlab.rb，如配置文件有更改需要重新加载生效)
gitlab-ctl reconfigure

# 启动
gitlab-ctl start

# 停用
gitlab-ctl stop

# 重启
gitlab-ctl restart

# 查看状态
gitlab-ctl status

# 查看日志
gitlab-ctl tail

# 检查redis的日志
gitlab-ctl tail redis

# 检查postgresql的日志
gitlab-ctl tail postgresql

# 检查gitlab-workhorse的日志
gitlab-ctl tail gitlab-workhorse

# 检查logrotate的日志
gitlab-ctl tail logrotate

# 检查nginx的日志
gitlab-ctl tail nginx

# 检查sidekiq的日志
gitlab-ctl tail sidekiq

# 检查unicorn的日志
gitlab-ctl tail unicorn

```

------

## 问题记录

### 管理员忘记密码--使用rails脚本重置密码
```bash
# 启动 rails
gitlab-rails console production

# 修改密码脚本
user = User.where(id: 1).first
user.password = '123'
user.password_confirmation = '123'
user.save!

```

### 内存比较小

```bash
# 如果内存比较小的话建议修改配置文件
unicorn['worker_processes'] = 1  #默认为2,1不能在线创建文件或修改
```
