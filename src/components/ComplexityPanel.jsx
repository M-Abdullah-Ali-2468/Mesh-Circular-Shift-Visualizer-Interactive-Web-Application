function ComparisonBar({ label, value, maxValue, colorClass }) {
  const width = maxValue === 0 ? 0 : Math.max((value / maxValue) * 100, 2);

  return (
    <div className="bar-row">
      <div className="bar-meta">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="bar-track">
        <div className={`bar-fill ${colorClass}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function ComplexityPanel({ metrics }) {
  const maxSteps = Math.max(metrics.meshSteps, metrics.ringSteps, 1);

  return (
    <section className="panel complexity-panel">
      <h2>Complexity Analysis</h2>
      <p>Real-time comparison between mesh communication and naive ring shift.</p>

      <div className="metric-grid">
        <div>
          <span className="metric-label">Row Shift Amount</span>
          <strong>{metrics.rowShiftAmount}</strong>
        </div>
        <div>
          <span className="metric-label">Column Shift Amount</span>
          <strong>{metrics.columnShiftAmount}</strong>
        </div>
        <div>
          <span className="metric-label">Total Communication Steps</span>
          <strong>{metrics.meshSteps}</strong>
        </div>
      </div>

      <div className="formula-block">
        <p>Ring steps = min(q, p - q)</p>
        <p>Mesh steps = (q mod sqrt(p)) + floor(q / sqrt(p))</p>
      </div>

      <div className="bar-chart">
        <ComparisonBar label="Mesh" value={metrics.meshSteps} maxValue={maxSteps} colorClass="mesh" />
        <ComparisonBar label="Ring" value={metrics.ringSteps} maxValue={maxSteps} colorClass="ring" />
      </div>
    </section>
  );
}
