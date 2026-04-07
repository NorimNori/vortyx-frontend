export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
}
