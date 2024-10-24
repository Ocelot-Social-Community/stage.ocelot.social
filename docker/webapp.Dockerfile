ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/webapp:${OCELOT_VERSION}-code AS build

FROM ghcr.io/ocelot-social-community/ocelot-social/webapp:${OCELOT_VERSION}-base AS branded
COPY --from=build /build .
