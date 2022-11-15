FROM node as builder

env project_env production

RUN mkdir -p /home/Docs

WORKDIR /home/Docs

COPY . /home/Docs

# linux需要安装esbuild补丁
RUN npm install esbuild-linux-64 --registry=https://registry.npm.taobao.org

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run docs:build

FROM nginx

COPY --from=builder /home/Docs/docs/.vitepress/dist /usr/share/nginx/html