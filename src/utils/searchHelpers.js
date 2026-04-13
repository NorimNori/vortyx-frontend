export const PAGE_SIZE = 9;

export function paginate(items, page) {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

export function totalPages(items) {
  return Math.ceil(items.length / PAGE_SIZE);
}
