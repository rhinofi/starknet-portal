rec {
  dev = {
    resources = {
      limits = {
        cpu = "50m";
        memory = "128Mi";
      };
      requests = {
        cpu = "25m";
        memory = "64Mi";
      };
    };
  };
  stg = dev;
  prd = {
    resources = {
      limits = {
        cpu = "400m";
        memory = "512Mi";
      };
      requests = {
        cpu = "200m";
        memory = "256Mi";
      };
    };
  };
}
