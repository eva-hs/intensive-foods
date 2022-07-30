export function paginate(items, selectedPage, pageSize) {
  const startIndex = (selectedPage - 1) * pageSize;
  const endIndex = selectedPage * pageSize;
  return items.slice(startIndex, endIndex);
}
