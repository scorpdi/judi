FROM node as builder

env project_env production

RUN npm install -g anywhere

RUN mkdir -p /home/Docs

WORKDIR /home/Docs

COPY . /home/Docs

RUN npm install --registry=https://registry.npm.taobao.org && export NODE_OPTIONS=--openssl-legacy-provider && npm run docs:build

FROM nginx

COPY --from=builder /home/Docs/docs/.vitepress/dist /usr/share/nginx/html