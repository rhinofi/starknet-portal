FROM node:16.14.0 as build
# ^-- using full node image for build, yarn install fails on alpine due
#     to missing deps.

ARG GITHUB_TOKEN
ARG GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN
ARG ENV_NAME

WORKDIR /app

# Copy to top level to avoid scripts being included in the app
COPY scripts/set-github-token-in-gitconfig.sh /
COPY scripts/remove-gitconfig.sh /

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY .yarnrc .yarnrc
COPY .npmrc .npmrc

# https://yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-frozen-lockfile
RUN --mount=type=secret,id=GITHUB_TOKEN \
  --mount=type=secret,id=GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN \
  GITHUB_TOKEN=$(cat /run/secrets/GITHUB_TOKEN) /set-github-token-in-gitconfig.sh && \
  GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN=$(cat /run/secrets/GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN) \
  yarn install --frozen-lockfile && \
  /remove-gitconfig.sh


COPY src src
COPY public public
COPY .eslintrc .eslintrc

RUN REACT_APP_ENV=$ENV_NAME yarn build


# This will be the output image of `docker build` if --target in not specified.
FROM nginxinc/nginx-unprivileged:1.21-alpine
# ^-- using alpine to keep the image small

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/nginx.conf
