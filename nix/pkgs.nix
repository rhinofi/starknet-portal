{
  sources ? import ../nix/sources.nix,
  config ? {},
  system ? builtins.currentSystem,
  overlays ? []
}:
let
  nixpgks = import ./../../nix/pkgs.nix;
  allOverlays =
    # These overlays augment centrally defined packages with things specific
    # to this service.
    [
      (import ./overlays/docker-build.nix)
      (import ./overlays/docker-image-tag.nix)
    ]
    ++
    overlays
  ;

  # This can be used to work against local version of copy of launch-deversifi
  # repo instead of specific git commit defined in sources.json
  # pkgsBasePath = ../../launch-deversifi;
  pkgsBasePath = sources.launch-deversifi;
  pkgsPath = pkgsBasePath + "/nix/pkgs-with-default-ci.nix";
in
  nixpgks { inherit config system; overlays = allOverlays; }