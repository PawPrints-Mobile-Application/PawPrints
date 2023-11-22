export default function ObjectToMap(
  object: Record<string, string | number>
): Map<string, string | number> {
  const map = new Map<string, string | number>();
  Object.keys(object).forEach((key) => map.set(key, object[key]));
  return map;
}
