export function addTrailingSlash(url?: string | null) {
  if (!url) {
    return url;
  }
  if (url.substr(-1) !== '/') {
    return url + '/';
  }
  return url;
}
