function ItemExtraData({ item }) {
  const hasData =
    item.developers || item.publishers || item.platforms?.length || item.status;

  if (!hasData) return null;

  return (
    <dl className="item-detail__extra">
      {item.developers && (
        <>
          <dt className="item-detail__extra-label">Desarrollador</dt>
          <dd className="item-detail__extra-value">{item.developers}</dd>
        </>
      )}
      {item.publishers && (
        <>
          <dt className="item-detail__extra-label">Editor</dt>
          <dd className="item-detail__extra-value">{item.publishers}</dd>
        </>
      )}
      {item.platforms?.length > 0 && (
        <>
          <dt className="item-detail__extra-label">Plataformas</dt>
          <dd className="item-detail__extra-value">
            {item.platforms.slice(0, 4).join(", ")}
          </dd>
        </>
      )}
      {item.status && (
        <>
          <dt className="item-detail__extra-label">Estado</dt>
          <dd className="item-detail__extra-value">{item.status}</dd>
        </>
      )}
    </dl>
  );
}

export default ItemExtraData;
