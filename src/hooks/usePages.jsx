import { useState } from "react";
import { INITIAL_PAGES } from "../utils/searchConstants";

export function usePages() {
  const [pages, setPages] = useState(INITIAL_PAGES);

  function setPage(tab, page) {
    setPages((prev) => ({ ...prev, [tab]: page }));
  }

  function resetPages() {
    setPages(INITIAL_PAGES);
  }

  return { pages, setPage, resetPages };
}
