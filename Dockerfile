FROM node:12-alpine as builder

RUN npm install --force -g yarn lerna

RUN mkdir -p /work/src /work/server
ADD [ ".", "/work/src"]

WORKDIR "/work/src"
RUN yarn install && \
    yarn build && \
    (cd packages/webserver/ && cp -rf app.js package*.json /work/server/) && \
    mkdir -p /work/server/views && \
    cp -rf packages/root-config/dist/* /work/server/views/ && \
    cp -rf packages/navbar/dist /work/server/views/navbar && \
    cp -rf packages/auth/dist /work/server/views/auth

FROM node:12-alpine
RUN mkdir -p /app/
COPY --from=builder ["/work/server/", "/app/"]
WORKDIR "/app/"
CMD ["node", "app.js"]
