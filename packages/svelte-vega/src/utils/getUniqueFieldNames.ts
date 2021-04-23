export default function getUniqueFieldNames<T>(objects: T[]): Set<string> {
  const fields = new Set<string>();
  objects.forEach((o) => {
    Object.keys(o).forEach((field) => {
      fields.add(field);
    });
  });

  return fields;
}
