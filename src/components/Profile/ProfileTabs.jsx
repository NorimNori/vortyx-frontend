import { useRef, useEffect } from "react";
import { TABS } from "../../utils/profileConstants";
import "./ProfileTabs.css";

function ProfileTabs({ activeTab, onTabChange }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 2,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel);
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <nav
      className="profile__tabs"
      aria-label="Secciones del perfil"
      ref={scrollRef}
    >
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
