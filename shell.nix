let
  pkgs = import ./nix/pkgs.nix {};
in
  pkgs.mkShell {
    shellHook = ''
      # Export GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN when running nix-shell
      # Used to access private npm packages hosted on github.
      # NOTE: this fails when using lorri+direnv since lorri runs shellHook
      # in a sandbox without internet access, hence we need to source in
      # .envrc as well
      source ${pkgs.export-GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN-dev.defaultBinPath}
    '';
    inputsFrom = [pkgs.dev-shell-with-node];
    buildInputs = with pkgs; [
    ]
    # Used in tests. Not including in darwin as it would have to be
    # built from source since we don't have it in binary cache.
    # TODO: build it in a macos builder on github actions.
    # TODO: pressure nixpkgs maintainers to enable builds for it. The reason
    # is not built by nixos build farm is due to it's ambiguous licence.
    ++ (pkgs.lib.optional (!pkgs.stdenv.isDarwin) mongodb)
    ;
  }