self: super:
{
  # This service will have a different images for different envs, so we also
  # want to have env specific tags.
  docker-image-tag = super.docker-image-tag.override { isEnvSpecific = true; };
}
