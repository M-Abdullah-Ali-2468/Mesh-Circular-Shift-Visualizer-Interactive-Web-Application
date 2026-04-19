export default function ControlPanel({ pValue, qValue, onPChange, onQChange, onRun, errors }) {
  return (
    <section className="panel control-panel">
      <h2>Input Controls</h2>
      <p>Set mesh size p and shift q, then run the two-stage mesh shift simulation.</p>

      <div className="control-grid">
        <label htmlFor="p-input">p (4-64, perfect square)</label>
        <input
          id="p-input"
          type="number"
          min="4"
          max="64"
          step="1"
          value={pValue}
          onChange={(event) => onPChange(event.target.value)}
        />

        <label htmlFor="q-input">q (1 to p-1)</label>
        <input
          id="q-input"
          type="number"
          min="1"
          step="1"
          value={qValue}
          onChange={(event) => onQChange(event.target.value)}
        />
      </div>

      <button type="button" onClick={onRun}>
        Run Simulation
      </button>

      {errors.length > 0 ? (
        <ul className="error-list">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : (
        <p className="ok-text">Inputs are valid. Simulation can run.</p>
      )}
    </section>
  );
}
