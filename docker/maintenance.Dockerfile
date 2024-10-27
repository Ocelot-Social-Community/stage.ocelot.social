ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/maintenance-build:${OCELOT_VERSION} AS build

FROM ghcr.io/ocelot-social-community/ocelot-social/maintenance-base:${OCELOT_VERSION} AS branded
COPY --from=build ./app/dist/ /usr/share/nginx/html/
COPY --from=build ./app/maintenance/nginx/custom.conf /etc/nginx/conf.d/default.conf
