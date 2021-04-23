export default function isFunction(functionToCheck: unknown): boolean {
  const getType = {};

  return (
    !!functionToCheck &&
    getType.toString.call(functionToCheck) === "[object Function]"
  );
}
