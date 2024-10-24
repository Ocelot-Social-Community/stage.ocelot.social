ARG OCELOT_VERSION=master

FROM ghcr.io/ocelot-social-community/ocelot-social/backend:${OCELOT_VERSION}-code AS build

FROM ghcr.io/ocelot-social-community/ocelot-social/backend:${OCELOT_VERSION}-base AS branded
COPY --from=build /build .
