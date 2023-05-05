export const getResourceUrl = (resource: Resource, withOrigin = true) => {
  if (resource.externalLink) {
    return resource.externalLink;
  }

  return `${withOrigin ? window.location.origin : ""}/memos/o/r/${resource.id}/${resource.publicId}/${resource.filename}`;
};
