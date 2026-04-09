function SectionTitle({ main, accent, accentMuted = false }) {
  return (
    <h2 className="section-title">
      {main}{" "}
      <span
        className={
          accentMuted ? "section-title__muted" : "section-title__accent"
        }
      >
        {accent}
      </span>
    </h2>
  );
}

export default SectionTitle;
