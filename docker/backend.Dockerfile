ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/backend-build:${OCELOT_VERSION} AS build

FROM ghcr.io/ocelot-social-community/ocelot-social/backend-base:${OCELOT_VERSION} AS branded
COPY --from=build /build .
