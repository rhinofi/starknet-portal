{
  image,
  pkgs ? import ../nix/pkgs.nix {},
  name ? baseNameOf ./..,
  envName ? "dev",
  # Can be used to override config from command line.
  replicas ? 1,
  configData ? null,
  # config and encrypted.secrets dirs as well as envConfig.nix are loaded
  # relative to this dir.
  configRootDir ? ./.
}:
pkgs.kubelib.makeDefaultService {
  inherit name envName configRootDir;
  args = {
    inherit image replicas configData;
    backendConfigSpec.cdn = {
      enabled = true;
      cachePolicy = {
        includeHost = true;
        includeProtocol = true;
        includeQueryString = false;
      };
    };
    livenessProbe.httpGet.path = "/";
    readinessProbe.httpGet.path = "/";
    runAsUser = 8000;
    serviceType = "NodePort";
  };
}
