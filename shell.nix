let
  pkgs = import ./nix/pkgs.nix {};
in
  pkgs.mkShell {
    inputsFrom = [
      # Inherit everything from dev-shell-with-node
      pkgs.dev-shell-with-node
    ];
    # Add project specific deps
    buildInputs = with pkgs; [
      libusb
    ] ++ (pkgs.lib.optional (!pkgs.stdenv.isDarwin) udev);
    # This is needed to build node-hid
    shellHook = ''
      # Export GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN when running nix-shell
      # Used to access private npm packages hosted on github.
      # NOTE: this fails when using lorri+direnv since lorri runs shellHook
      # in a sandbox without internet access, hence we need to source in
      # .envrc as well
      source ${pkgs.export-GITHUB_PACKAGE_REGISTRY_ACCESS_TOKEN-dev.defaultBinPath}
      source ${pkgs.export-GITHUB_TOKEN-dev.defaultBinPath}
      export CFLAGS=' -isystem ${pkgs.libusb.dev}/include/libusb-1.0';
    '';
  }
