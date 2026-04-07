import { ITEM_STATUS } from "../../utils/profileConstants";
import { formatDate } from "../../utils/profileHelpers";

function ProfileHeader({ user, games, movies, series }) {
  const totalCompleted = [...games, ...movies, ...series].filter(
    (i) => i.status === ITEM_STATUS.COMPLETED,
  ).length;

  const quickStats = [
    { val: games.length, label: "Juegos", color: "var(--color-game)" },
    { val: movies.length, label: "Películas", color: "var(--color-movie)" },
    { val: series.length, label: "Series", color: "var(--color-brand)" },
    {
      val: totalCompleted,
      label: "Completados",
      color: "var(--color-success)",
    },
  ];

  return (
    <header className="profile__header">
      <div className="profile__avatar" aria-label="Avatar del usuario">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="profile__info">
        <h1 className="profile__name">{user.name.toUpperCase()}</h1>
        <p className="profile__meta">
          Miembro desde {formatDate(user.createdAt)}
        </p>

        <div className="profile__quick-stats">
          {quickStats.map(({ val, label, color }) => (
            <div key={label} className="profile__quick-stat">
              <span className="profile__quick-stat-val" style={{ color }}>
                {val}
              </span>
              <span className="profile__quick-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
