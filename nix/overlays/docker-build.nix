self: super:
{
  # Wrap original docker-build adding ENV_NAME docker build-arg
  docker-build = super.utils.writeBashBin "docker-build" ''
    env_name=''${ENV_NAME:-$(${self.branch-to-env-name.defaultBinPath} ''${BASE_BRANCH:-''${BRANCH_NAME:-dev}})}

    # TODO: move this magic to docker-build script, same way GITHUB_TOKEN arg
    #   is handled.
    source ${self.export-GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN-dev.defaultBinPath}

    DOCKER_BUILD_EXTRA_ARGS="--build-arg ENV_NAME=$env_name --secret id=GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN,env=GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN" ${super.docker-build.defaultBinPath}
  '';
}
