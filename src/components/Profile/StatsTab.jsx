import {
  ITEM_STATUS,
  HEATMAP_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../utils/profileConstants";
import {
  calcBacklogHours,
  countByStatus,
  getTopGenres,
  buildHeatmap,
} from "../../utils/profileHelpers";
import "./StatsTab.css";

function StatsTab({ games, movies, series }) {
  const allItems = [...games, ...movies, ...series];
  const backlogHours = calcBacklogHours(games);
  const activity = buildHeatmap(games, [...movies, ...series]);

  const topGenres = Object.entries(
    games.reduce((acc, g) => {
      if (g.genre) acc[g.genre] = (acc[g.genre] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);

  const summary = [
    { val: games.length, label: "Juegos", color: "var(--color-game)" },
    { val: movies.length, label: "Películas", color: "var(--color-movie)" },
    { val: series.length, label: "Series", color: "var(--color-brand)" },
    {
      val: allItems.filter((i) => i.status === ITEM_STATUS.COMPLETED).length,
      label: "Completados",
      color: "var(--color-success)",
    },
  ];

  return (
    <div className="profile__stats">
      <div className="stats__summary">
        {summary.map(({ val, label, color }) => (
          <div key={label} className="stats__summary-card">
            <span className="stats__summary-val" style={{ color }}>
              {val}
            </span>
            <span className="stats__summary-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="stats__grid">
        <section className="stats__panel" aria-label="Mapa de actividad">
          <h3 className="stats__panel-title">Actividad — últimos 70 días</h3>
          <div className="stats__heatmap">
            {activity.map((level, i) => (
              <div
                key={i}
                className="stats__heatmap-cell"
                style={{
                  background: HEATMAP_COLORS[level],
                  boxShadow:
                    level === 5 ? "0 0 5px rgba(163,255,18,0.5)" : "none",
                }}
                title={`Nivel ${level}`}
              />
            ))}
          </div>
          <div className="stats__heatmap-legend">
            <span className="stats__heatmap-legend-label">Menos</span>
            {HEATMAP_COLORS.map((color, i) => (
              <div
                key={i}
                className="stats__heatmap-legend-cell"
                style={{ background: color }}
              />
            ))}
            <span className="stats__heatmap-legend-label">Más</span>
          </div>
        </section>

        <section className="stats__panel" aria-label="Horas de backlog">
          <h3 className="stats__panel-title">Tu backlog en horas</h3>
          <div className="stats__backlog">
            <p className="stats__backlog-val">{backlogHours}</p>
            <p className="stats__backlog-unit">horas estimadas</p>
            <p className="stats__backlog-sub">
              para completar tu backlog actual
            </p>
          </div>
        </section>

        <section className="stats__panel" aria-label="Estados de juegos">
          <h3 className="stats__panel-title">Estado de juegos</h3>
          <ul className="stats__status-list">
            {Object.values(ITEM_STATUS).map((status) => (
              <li
                key={status}
                className="stats__status-item"
                style={{
                  borderColor: `${STATUS_COLORS[status]}33`,
                  background: `${STATUS_COLORS[status]}08`,
                }}
              >
                <span
                  className="stats__status-label"
                  style={{ color: STATUS_COLORS[status] }}
                >
                  {STATUS_LABELS[status]}
                </span>
                <span
                  className="stats__status-val"
                  style={{ color: STATUS_COLORS[status] }}
                >
                  {countByStatus(games)[status] || 0}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="stats__panel" aria-label="Géneros favoritos">
          <h3 className="stats__panel-title">Géneros top</h3>
          <div className="stats__genres">
            {topGenres.length > 0 ? (
              topGenres.map((genre, i) => (
                <span
                  key={genre}
                  className="stats__genre-tag"
                  style={{
                    borderColor:
                      i === 0
                        ? "rgba(34,211,238,0.4)"
                        : i === 1
                          ? "rgba(124,58,237,0.3)"
                          : "rgba(255,122,0,0.25)",
                    color:
                      i === 0
                        ? "var(--color-brand)"
                        : i === 1
                          ? "var(--color-vortex)"
                          : "var(--color-game)",
                  }}
                >
                  {i === 0 && "★ "}
                  {genre}
                </span>
              ))
            ) : (
              <p className="profile__empty">
                Agrega juegos para ver tus géneros top.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StatsTab;
