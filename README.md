# Docs

## 部署记录

```bash
# 创建镜像文件
docker build --rm -t docs .
# 运行镜像文件
docker run -d -p 3000:80 --name docs docs
```
