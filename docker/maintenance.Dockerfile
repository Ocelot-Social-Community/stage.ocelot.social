ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/maintenance:${OCELOT_VERSION}-code AS build

FROM nginx:alpine AS branded
COPY --from=build ./app/dist/ /usr/share/nginx/html/
COPY --from=build ./app/maintenance/nginx/custom.conf /etc/nginx/conf.d/default.conf
