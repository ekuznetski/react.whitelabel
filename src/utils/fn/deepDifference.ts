export function deepDifference(object1: any, object2: any, returnKeysOnly = false): any {
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') {
    throw new Error('shallowDifference compare only elements with `object` type');
  }

  const diff = returnKeysOnly ? [] : {};
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const diffKeys = keys1.concat(keys2).filter((item) => !keys1.includes(item) || !keys2.includes(item));

  for (let key of diffKeys) {
    if (!object1[key] || !object2[key])
      Object.assign(diff, returnKeysOnly ? [key] : { [key]: [object1[key], object2[key]] });
  }

  for (let key of keys1) {
    if (object1[key] != object2[key])
      Object.assign(diff, returnKeysOnly ? [key] : { [key]: [object1[key], object2[key]] });
  }

  return diff;
}
