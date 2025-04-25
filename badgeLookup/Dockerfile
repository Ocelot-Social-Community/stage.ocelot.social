FROM node:23-alpine3.20 AS base

# DB_URL is required at build time to generate the model cache
ARG DB_URL

# ENVs (available in production aswell, can be overwritten by commandline or env file)
## DOCKER_WORKDIR would be a classical ARG, but that is not multi layer persistent - shame
ENV DOCKER_WORKDIR="/server"
## SET NODE_ENV
ENV NODE_ENV="production"
## App relevant Envs
ENV PORT="4000"

# dummy variables required to build
ENV SECRET_REQUEST = "INVALID"
ENV SECRET_SUBMIT = "INVALID"

# Labels
LABEL org.label-schema.name="reformer.network:badge-lookup"
LABEL org.label-schema.description="reformer.network badge-lookup"
LABEL org.label-schema.usage="https://github.com/IT4Change/reformer.network/tree/master/badgeLookup/README.md"
LABEL org.label-schema.url="https://github.com/IT4Change/reformer.network/tree/master/badgeLookup"
LABEL org.label-schema.vcs-url="https://github.com/IT4Change/reformer.network/tree/master/badgeLookup"
LABEL org.label-schema.vendor="IT4Change"
LABEL org.label-schema.schema-version="1.0"
LABEL maintainer="info@it4c.dev"

# Install Additional Software
## install: node-gyp dependencies
# RUN apk --no-cache add g++ make python3
RUN apk update
RUN apk add --no-cache coreutils

# Settings
## Expose Container Port
EXPOSE ${PORT}

## Workdir
RUN mkdir -p ${DOCKER_WORKDIR}
WORKDIR ${DOCKER_WORKDIR}

##################################################################################
# DEVELOPMENT (Connected to the local environment, to reload on demand) ##########
##################################################################################
FROM base AS development
CMD ["/bin/sh", "-c", "npm install && npm run dev"]

##################################################################################
# BUILD (Does contain all files and is therefore bloated) ########################
##################################################################################
FROM base AS build
COPY package.json package-lock.json ./
RUN npm install --include=dev --frozen-lockfile --non-interactive
COPY . .
RUN npm run build

##################################################################################
# PRODUCTION (Does contain only "binary"- and static-files to reduce image size) #
##################################################################################
FROM base AS production
COPY --from=build ${DOCKER_WORKDIR}/package.json ${DOCKER_WORKDIR}/package-lock.json ./
RUN npm install --omit=dev --frozen-lockfile --non-interactive
COPY --from=build ${DOCKER_WORKDIR}/build ./build
COPY --from=build ${DOCKER_WORKDIR}/tsconfig.json ./tsconfig.json
COPY --from=build ${DOCKER_WORKDIR}/temp ./temp

CMD ["/bin/sh", "-c",  "npm run start"]