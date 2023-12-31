export default (object: Record<string, any>) => {
  const map = new Map<string, any>();
  Object.keys(object).forEach((key) => map.set(key, object[key]));
  return map;
};
