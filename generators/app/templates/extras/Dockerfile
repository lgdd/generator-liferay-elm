ARG LIFERAY_IMAGE=liferay/portal:7.3.5-ga6

FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn && \
  yarn build:liferay

FROM ${LIFERAY_IMAGE}

COPY --chown=liferay:liferay --from=0 /usr/src/app/build.liferay /mnt/liferay/deploy
COPY --chown=liferay:liferay docker/liferay/files/ /mnt/liferay/files/
