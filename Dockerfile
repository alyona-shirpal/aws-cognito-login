FROM node:20-alpine as BUILDER
RUN apk add g++ make python3
RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci --unsafe --legacy-peer-deps
COPY . /app
ARG BUILD_ENVIRONMENT=production
ARG COMMIT_ID=unknown
RUN npm version prerelease --preid=${COMMIT_ID} --no-git-tag-version
RUN npm run "build:${BUILD_ENVIRONMENT}"


##
FROM node:20-alpine
RUN apk add g++ make python3

RUN mkdir /app \
  && mkdir /data

WORKDIR /app

COPY --from=BUILDER /app/package.json /app/package.json
COPY --from=BUILDER /app/package-lock.json /app/package-lock.json
RUN npm ci --unsafe --legacy-peer-deps --production \
    && npm cache clean --force \
    && chmod -R 777 '.'
COPY --from=BUILDER /app/build /app/build

ARG BUILD_ENVIRONMENT=production
ENV BUILD_ENVIRONMENT ${BUILD_ENVIRONMENT}
ENV NODE_OPTIONS --max_old_space_size=8192
CMD npm run "start:${BUILD_ENVIRONMENT}"
EXPOSE 3000
ARG COMMIT_ID=unknown
LABEL software.aisee.commit=${COMMIT_ID}