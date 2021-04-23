const EMPTY = {};

export default function shallowEqual(
  a: Record<string, unknown> = EMPTY,
  b: Record<string, unknown> = EMPTY
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  return (
    a === b ||
    (aKeys.length === bKeys.length && aKeys.every((key) => a[key] === b[key]))
  );
}
