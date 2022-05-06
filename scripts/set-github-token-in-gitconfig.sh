#!/usr/bin/env bash
set -ueo pipefail

ENV_SECRETS_DIR=${ENV_SECRETS_DIR:-secrets.encrypted/dev}
GITHUB_TOKEN_FILE_NAME=${GITHUB_TOKEN_FILE_NAME:-GITHUB_TOKEN}

# NOTE: this is only meant to be used in CI. If you run this on your machine
#   it will might mess up your gitconfig.
token=${GITHUB_TOKEN:-$(sops -d ${ENV_SECRETS_DIR}/${GITHUB_TOKEN_FILE_NAME})}

# This is used to authenticate request to github so that we can pull private
# repost over https.
echo '[url "https://'$token':x-oauth-basic@github.com/"]
 insteadOf = https://github.com/
' >> $HOME/.gitconfig