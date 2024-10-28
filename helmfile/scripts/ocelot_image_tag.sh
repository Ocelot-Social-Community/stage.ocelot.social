#!/usr/bin/env bash
SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)

set -a; . ${SCRIPT_DIR}/../../.env; set +a;
echo $OCELOT_VERSION
