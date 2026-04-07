import { TABS } from "../../utils/profileConstants";

function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <nav className="profile__tabs" aria-label="Secciones del perfil">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          className={`profile__tab${activeTab === id ? " profile__tab--active" : ""}`}
          onClick={() => onTabChange(id)}
          type="button"
          role="tab"
          aria-selected={activeTab === id}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default ProfileTabs;
