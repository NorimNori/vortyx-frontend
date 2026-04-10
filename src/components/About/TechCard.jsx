import "./TechCard.css";

function TechCard({ abbr, name, role, color }) {
  return (
    <li className="about__tech-card">
      <div className={`about__tech-icon about__tech-icon--${color}`}>
        {abbr}
      </div>
      <div className="about__tech-info">
        <p className="about__tech-name">{name}</p>
        <p className="about__tech-role">{role}</p>
      </div>
    </li>
  );
}

export default TechCard;
