import { useState } from "react";

export function usePages() {
  const [page, setPageState] = useState(1);

  function setPage(newPage) {
    setPageState(newPage);
  }

  function resetPage() {
    setPageState(1);
  }

  return { page, setPage, resetPage };
}
