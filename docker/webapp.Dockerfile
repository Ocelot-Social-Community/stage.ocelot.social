ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/webapp-build:${OCELOT_VERSION} AS build

FROM ghcr.io/ocelot-social-community/ocelot-social/webapp-base:${OCELOT_VERSION} AS branded
COPY --from=build /build .
