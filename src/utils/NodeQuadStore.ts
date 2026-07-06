export const STORAGE_PATH: string = './data/filestores/';

function hashString(str: string): string {
  let hash = 0;
  for (let charIndex = 0; charIndex < str.length; ++charIndex) {
    hash += str.charCodeAt(charIndex);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  return (((hash + (hash << 15)) & 4294967295) >>> 0).toString(16);
}

const newUris = new Set<string>();

/**
 * @deprecated — URI generation for old quad stores. Will be removed.
 */
export function setURIs(
  nodeToCurrentUriMap: Map<{ id: string }, string>,
  prefix = process.env.DATA_ROOT
): Promise<[string, string][]> {
  let counter = 0;
  let res: [string, string][] = [];
  let currentTimestamp = Date.now();
  nodeToCurrentUriMap.forEach((currentUri, node) => {
    let newUri = `${prefix}${hashString(currentTimestamp + '.' + counter++)}`;
    while (newUris.has(newUri)) {
      newUri = `${prefix}${hashString(currentTimestamp + '.' + counter++)}`;
    }
    newUris.add(newUri);
    res.push([currentUri, newUri]);
  });
  return Promise.resolve(res);
}
