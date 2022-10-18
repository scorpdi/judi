FROM node as builder

env project_env production

RUN npm install -g anywhere

RUN mkdir -p /home/Docs

WORKDIR /home/Docs

COPY ./docs/.vuepress/dist /home/Docs

FROM nginx

COPY --from=builder /home/Docs /usr/share/nginx/html