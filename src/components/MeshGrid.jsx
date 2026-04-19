function ArrowHint({ stage, shiftAmount }) {
  if (stage === 'row') {
    return <span className="arrow-hint">Row movement: {shiftAmount === 0 ? 'No movement' : `→ by ${shiftAmount}`}</span>;
  }

  if (stage === 'column') {
    return <span className="arrow-hint">Column movement: {shiftAmount === 0 ? 'No movement' : `↓ by ${shiftAmount}`}</span>;
  }

  return <span className="arrow-hint">Initial state (no movement yet)</span>;
}

export default function MeshGrid({
  title,
  data,
  meshSize,
  stage,
  shiftAmount,
  compact = false
}) {
  const cellClass = compact ? 'mesh-cell compact' : 'mesh-cell';

  return (
    <section className={`panel mesh-panel ${compact ? 'compact-panel' : ''}`}>
      <div className="mesh-header">
        <h3>{title}</h3>
        <ArrowHint stage={stage} shiftAmount={shiftAmount} />
      </div>

      <div
        className={`mesh-grid ${stage !== 'none' ? 'animated' : ''} ${compact ? 'compact-grid' : ''}`}
        style={{ gridTemplateColumns: `repeat(${meshSize}, minmax(0, 1fr))` }}
      >
        {data.map((value, nodeIndex) => (
          <article key={`${title}-${nodeIndex}`} className={cellClass}>
            <div className="node-index">Node {nodeIndex}</div>
            <div className="node-value">{value}</div>
            {stage === 'row' && shiftAmount > 0 ? <div className="movement-tag">→</div> : null}
            {stage === 'column' && shiftAmount > 0 ? <div className="movement-tag">↓</div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
