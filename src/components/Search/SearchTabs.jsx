import { TABS } from "../../utils/searchConstants";

function SearchTabs({ activeTab, tabItems, isLoading, onTabChange }) {
  return (
    <nav className="search-page__tabs" aria-label="Filtrar por categoría">
      {TABS.map(({ id, label }) => {
        const count = tabItems[id]?.length || 0;
        return (
          <button
            key={id}
            className={`search-page__tab${
              activeTab === id ? " search-page__tab--active" : ""
            }`}
            onClick={() => onTabChange(id)}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            disabled={isLoading}
          >
            {label}
            {!isLoading && (
              <span className="search-page__tab-count">{count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default SearchTabs;
